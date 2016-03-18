'use strict'

const fs = require('fs')

/**
 * @param {array} htmlFilesArray
 */
function stringifyHtmlFiles (htmlFilesArray) {
  return htmlFilesArray.map((htmlFile) => fs.readFileSync(htmlFile, 'utf8'))
}

module.exports = stringifyHtmlFiles
