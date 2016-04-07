'use strict'

const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const stringifyFiles = require('./lib/stringifyFiles')
const createFilesObj = require('./lib/createFilesObj')
const hashFilesObj = require('./lib/hashFilesObj')
const writeJsUL = require('./lib/writeJsUL')
const replaceHtml = require('./lib/replaceHtml')
const addStatusBar = require('./lib/addStatusBar')
const writeNewHtml = require('./lib/writeNewHtml')
const uncommentingEJS = require('./lib/uncommentingEJS')
let botGenerator

/**
* @param {Object} options
*   siteUrl: String            (required)
*   assetsPath: Array          (required)
*   assetsRoute: Array         (required)
*   routes: Object             (required)
*   userCount: Number          (optional - defaults to 10)
*   wfPath: String             (optional - defaults to '/wfPath')
*   wfRoute: String            (optional - defaults to '/wfRoute')
*   seedScript: String         (optional - defaults to 'wf-seed.js')
*   statusBar: Boolean         (optional - defaults to true)
*   devMode:   Boolean         (option   - defaults to true)
*
* @param {string} serverRoot - path to root folder
*/

function WebFlight (options, serverRoot) {
  Object.keys(options).forEach((key) => {
    this[key] = options[key]
  })

  let fileNamesArr = Object.keys(this.routes).map((file) => {
    return path.basename(this.routes[file])
  })

  this.count = 0  // non-configurable
  this.active = false // non-configurable
  this.fileNames = fileNamesArr // non-configurable

  this.wfPath = options.wfPath || path.join(serverRoot, '/wfPath')  // default

  // TODO: existsSync is deprecated, need alternative
  if (!fs.existsSync(this.wfPath)) {
    fs.mkdirSync(this.wfPath)
    fs.mkdirSync(path.join(this.wfPath, 'js'))
  }

  this.wfRoute = options.wfRoute || ('/wfRoute')  // default

  this.seedScript = options.seedScript || path.join(this.wfPath, 'js/wf-seed.js')  // default

  this.jsOutputDL = fileNamesArr.map((file) => { // non-configurable
    if (path.extname(this.routes[file]) === '.html') {
      file = path.basename(this.routes[file], '.html')
      return `${this.wfPath}/js/${file}-download.js`
    } else if (path.extname(this.routes[file]) === '.ejs') {
      file = path.basename(this.routes[file], '.ejs')
      return `${this.wfPath}/js/${file}-download.js`
    }
  })

  this.htmlOutput = fileNamesArr.map((file) => { // non-configurable
    return `${this.wfPath}/wf-${file}`
  })

  this.userCount = options.userCount || 5  // default (redirect)
  this.prepCount = Math.floor(this.userCount * 0.75)  // non-configurable (start bots)
  this.stopCount = Math.floor(this.userCount * 0.50)  // non-configurable (kill bots, redirect back)

  this.statusBar = options.statusBar || true // default
  this.devMode = options.devMode || true // default

  // Require for botGenerator is based on devMode flag
  setBotGenerator(this.devMode)

  if (!this.siteUrl) showError('siteUrl')
  if (!this.assetsPath) showError('assetsPath')
  if (!this.assetsRoute) showError('assetsRoute')
  if (!this.routes) showError('routes')
  if (!options) showError('options')
}

WebFlight.prototype.init = function () {
  const htmlFiles = Object.keys(this.routes).map((route) => {
    return this.routes[route]
  })
  const htmlStrings = stringifyFiles(htmlFiles)
  const filesObj = createFilesObj(this.assetsPath, this.assetsRoute)
  if (this.statusBar) {
    hashFilesObj(filesObj)
    .then(writeJsUL.bind(null, this.seedScript, this.siteUrl, this.stopCount))
    .then(replaceHtml.bind(null, htmlStrings, htmlFiles))
    .then(addStatusBar.bind(null))
    .then(uncommentingEJS.bind(null))
    .then(writeNewHtml.bind(null, this.htmlOutput))
  } else {
    hashFilesObj(filesObj)
    .then(writeJsUL.bind(null, this.seedScript, this.siteUrl, this.stopCount))
    .then(replaceHtml.bind(null, htmlStrings, htmlFiles))
    .then(uncommentingEJS.bind(null))
    .then(writeNewHtml.bind(null, this.htmlOutput))
  }
}

WebFlight.prototype.redirect = function (req, res, next) {
  const destination = req.originalUrl

  if (this.routes[destination]) {
    res.sendFile(`/${this.wfPath}/wf-${path.basename(this.routes[destination])}`)
  } else {
    next()
  }
}

WebFlight.prototype.start = function () {
  // if devMode is false, create screen for Xvfb to run
  if (!this.devMode) {
    child_process.exec('export DISPLAY=\'0:99\'')
    child_process.exec('Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &')
  }

  botGenerator(this.seedScript)
  this.active = true
}

WebFlight.prototype.watch = function (req, res, next) {
  const destination = req.originalUrl

  if (path.extname(destination) === '.html' || path.extname(destination) === '') {
    ++this.count

    setTimeout(function () { --this.count }.bind(this), 20000)
  }

  if (destination === '/count.check.4wf') return res.send({count: this.count})
  if (destination === '/bots.no.longer.seeding.4wf') {
    this.active = false
    console.log('bots ending redirect')
  }
  if (!this.active && this.count > this.prepCount) this.start()
  if (this.count > this.userCount) return this.redirect(req, res, next)

  next()
}

function showError (input) {
  if (input === 'options') console.error('Error: You must enter an options object')
  else console.log(`Error: WebFlight options object requires "${input}" property`)
}

function setBotGenerator (bool) {
  return bool ? botGenerator = require('./lib/botGeneratorDevMode')
              : botGenerator = require('./lib/botGenerator')
}
module.exports = WebFlight
