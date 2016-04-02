'use strict'

const fs = require('fs')
const path = require('path')
const commentingEJS = require('./commentingEJS')

/**
 * @param {array} filesArray - array of files from route options
 */
function stringifyFiles (filesArray) {
  if (filesArray.constructor !== Array) filesArray = [filesArray]

  return filesArray.map((file) => {
    if (path.extname(file) === '.ejs') {
      const stringFile = fs.readFileSync(file, 'utf8')
      return commentingEJS(stringFile)
    } else {
      return fs.readFileSync(file, 'utf8')
    }
  })
}

module.exports = stringifyFiles
