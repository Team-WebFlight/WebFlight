'use strict'

const cheerio = require('cheerio')

function replaceHtml(htmlString, hashObject) {
  const filesArray = Object.keys(hashObject)
  const $ = cheerio.load(htmlString)
  
  function replaceSrc(file) {
    let $elemArray = $(`[src="${file}"]`)
    
    $elemArray.each((index, elem) => {
      $(elem).removeAttr('src')
      $(elem).addClass(hashObject[file])
    })
    
    $elemArray = $(`[src='${file}']`)
    
    $elemArray.each((index, elem) => {
      $(elem).removeAttr('src')
      $(elem).addClass(hashObject[file])
    })
  }
  
  filesArray.forEach(replaceSrc)
  
  $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
  $('body').append('<script src="webflight.js"></script>')
  
  return $.html()  
}

module.exports = replaceHtml