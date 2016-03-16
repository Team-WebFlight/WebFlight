'use strict'

const fs = require('fs')

/**
 * @param {string} file
 */
function stringifyHtml (file) {
  return fs.readFileSync(file, 'utf8')
}

module.exports = stringifyHtml
