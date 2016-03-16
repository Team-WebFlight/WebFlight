'use strict'

const cheerio = require('cheerio')

function replaceHtml (htmlString, wfScriptName, filesObj) {
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

  $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
  $('body').append(`<script src="${wfScriptName}"></script>`)

  return $.html()
}

module.exports = replaceHtml
