'use strict'

const fs = require('fs')

/**
 * @param {string} file
 */
 //this stringifyHtml takes in a filepath or an array of many filepaths
 //
function stringifyHtml (file) {
  //so this function will either do readFileSync on one path or an array. so it might change to do a foreach on array
  return fs.readFileSync(file, 'utf8')
}

module.exports = stringifyHtml
