'use strict'

const path = require('path')
const cheerio = require('cheerio')

function replaceHtml (htmlStringsArray, htmlFilesArray, filesObj) {
  const videoExtsArray = [ '.mp4', '.m4v', '.webm' ]
  const allExtsArray = ['.mp4', '.m4v', '.webm', '.m4a', '.mp3', '.wav', '.aac', '.ogg', '.oga', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.css', '.html', '.js', '.md', '.pdf', '.txt']

  const filesArray = Object.keys(filesObj)
  return htmlStringsArray.map((htmlString, index) => {
    const $ = cheerio.load(htmlString)
    let dlScript = '<script> \nvar client = new WebTorrent();\n'

    filesArray.forEach(replaceSrc)

    function replaceSrc (file) {
      if (allExtsArray.indexOf(path.extname(file)) < 0) return

      if (videoExtsArray.indexOf(path.extname(file)) > -1) {
        let $elemArray = $(`[src="${file}"]`)

        $elemArray.each((index, elem) => {
          const $div = $('<div></div>')
          $(elem).replaceWith($div)
          $($div).addClass(filesObj[file].hash)
          dlScript += `

      client.add('${filesObj[file].magnet}', function(torrent) {
        var file = torrent.files[0];
        var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));

        if (elementsArray.length) {
          elementsArray.forEach(function(element) {
            file.getBlobURL(function(err, url) {
              $(element).replaceWith($("<video autoplay src='" + url + "' controls></video>"))
            })
          });
        }
      });`
        })

        $elemArray = $(`[src='${file}']`)

        $elemArray.each((index, elem) => {
          $(elem).removeAttr('src')
          $(elem).addClass(filesObj[file].hash)
          dlScript += `

      client.add('${filesObj[file].magnet}', function(torrent) {
        var file = torrent.files[0];
        var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));

        if (elementsArray.length) {
          elementsArray.forEach(function(element) {
            file.getBlobURL(function(err, url) {
              $(element).replaceWith($("<video autoplay src='" + url + "' controls></video>"))
            })
          });
        }
      });`
        })
      }

      let $elemArray = $(`[src="${file}"]`)
      $elemArray.each((index, elem) => {
        $(elem).removeAttr('src')
        $(elem).addClass(filesObj[file].hash)
        dlScript += `

    client.add('${filesObj[file].magnet}', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));

      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });`
      })

      $elemArray = $(`[src='${file}']`)

      $elemArray.each((index, elem) => {
        $(elem).removeAttr('src')
        $(elem).addClass(filesObj[file].hash)
        dlScript += `

    client.add('${filesObj[file].magnet}', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));

      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });`
      })
    }

    dlScript += '</script>'

    $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
    $('body').append('<script src="https://code.jquery.com/jquery-2.2.2.js"></script>')
    $('body').append(dlScript)

    return $.html()
  })
}

module.exports = replaceHtml
