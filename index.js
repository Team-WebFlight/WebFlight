'use strict'

const stringifyHtml = require('./lib/stringifyHtml')
const makeFilesObj = require('./lib/makeFilesObj')
const hashFilesObj = require('./lib/hashFilesObj')
const writeJsDL = require('./lib/writeJsDL')
const writeJsUL = require('./lib/writeJsUL')
const replaceHtml = require('./lib/replaceHtml')
const writeNewHtml = require('./lib/writeNewHtml')
const botGenerator = require(('./src/botGenerator'))

const WebFlight = {}

// options :: Object
  // originalHtml: .html file to be rebuilt
  // filesFolder: folder with files to be torrented
  // filesRoute: path on the server for files
  // jsOutput: location and name for webflight.js file
  // htmlOutput: location and name for rebuilt html file
  // route: route to redirect
WebFlight.start = (options) => {
  return new Promise((resolve, reject) => {
    const originalHtmlString = stringifyHtml(options.originalHtml)
    const filesObj = makeFilesObj(options.filesFolder, options.filesRoute)

    hashFilesObj(filesObj)
      .then(writeJsDL.bind(null, options.jsOutputDL))
      .then(writeJsUL.bind(null, options.jsOutputUL))
      .then(replaceHtml.bind(null, originalHtmlString))
      .then(writeNewHtml.bind(null, options.htmlOutput))
      .then(botGenerator.bind(null, options))
      .then(resolve)

    WebFlight.route = options.route
  })
}

module.exports = WebFlight
