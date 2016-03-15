'use strict'

const cheerio = require('cheerio')

function replaceHtml (htmlString, filesObj) {
  return new Promise((resolve, reject) => {
    const filesArray = Object.keys(filesObj)
    const $ = cheerio.load(htmlString)

    filesArray.forEach(replaceSrc)

    function replaceSrc (file) {
      let $elemArray = $(`[src="${file}"]`)

      $elemArray.each((index, elem) => {
        $(elem).removeAttr('src')
        $(elem).addClass(filesObj[file].hash)
      })

      $elemArray = $(`[src='${file}']`)

      $elemArray.each((index, elem) => {
        $(elem).removeAttr('src')
        $(elem).addClass(filesObj[file].hash)
      })
    }

    $('body').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>')
    $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
    $('body').append('<script src="webflight.js"></script>')

    resolve($.html())
  })
}

module.exports = replaceHtml
