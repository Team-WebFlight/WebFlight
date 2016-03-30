'use strict'

const cheerio = require('cheerio')

function replaceHtml (htmlStringsArray, seedObj) {
  console.log('in replaceHTML?👷', htmlStringsArray, 'up😾', seedObj)
  const htmlStrings = htmlStringsArray.map((htmlString, index) => {
    let dlScript = `
    <script>
      var client = new WebTorrent();

      client.add('${seedObj[index].magnet}', function(torrent) {
        torrent.files.forEach(function(file, index) {
          file.getBlobURL(function(err, url) {
            if (err) console.log(err);

            var elementsArray = [].slice.call(document.getElementsByClassName('${seedObj[index].hash}' + index));
            elementsArray.forEach(function(element) {
              element.src = url;
            });
          });
        });
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

    // jQuery check
    let hasJquery = false
    const $script = $('script')

    $script.each((i, elem) => {
      const scriptSrc = $(elem).attr('src').toLowerCase()

      if (scriptSrc.includes('jquery')) hasJquery = true
    })

    if (!hasJquery) {
      $('body').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>')
    }

    $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
    $('body').append(dlScript)

    return $.html()
  })
  console.log('htmlStrings?👳', htmlStrings, 'seedObj', seedObj)
  return [htmlStrings, seedObj]
}

module.exports = replaceHtml
