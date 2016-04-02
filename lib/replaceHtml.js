'use strict'

const cheerio = require('cheerio')

function replaceHtml (htmlStringsArray, seedObj) {
  const htmlStrings = htmlStringsArray.map((htmlString, index) => {
    let dlScript = `
    <script>
      var client = new WebTorrent();

      client.add('${seedObj[index].magnet}', function(torrent) {
        torrent.files.forEach(file, index) {
          file.getBlobURL(function(err, url) {
            if (err) console.log(err);

            var elementsArray = [].slice.call(document.getElementsByClassName('${seedObj[index].hash}' + index));
            elementsArray.forEach(function(element) {
              element.src = url;
            });
          });
        }
      });
    </script>`

    const $ = cheerio.load(htmlString)
    const $src = $('body').find('[src]')

    $src.each((i, elem) => {
      const src = $(elem).attr('src')
      const fileIndex = seedObj[index].srcs.indexOf(src)

      if (fileIndex > -1) {
        $(elem).removeAttr('src')
        $(elem).addClass(seedObj[index].hash + fileIndex)
      }
    })

    $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
    $('body').append(dlScript)

    return $.html()
  })
  return [htmlStrings, seedObj]
}

module.exports = replaceHtml
