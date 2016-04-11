'use strict'

const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const stringifyFiles = require('./lib/stringifyFiles')
const createFilesObj = require('./lib/createFilesObj')
const createSeedObj = require('./lib/createSeedObj')
const hashSeedObj = require('./lib/hashSeedObj')
const writeSeedScript = require('./lib/writeSeedScript')
const replaceHtml = require('./lib/replaceHtml')
const writeNewHtml = require('./lib/writeNewHtml')
const uncommentingEJS = require('./lib/uncommentingEJS')
<<<<<<< HEAD
let startBots
=======
let botGenerator
>>>>>>> 3e0be8b4773ef2feab7f824c62d2470ef00dcba4

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

  const fileNamesArr = Object.keys(this.routes).map((file) => {
    return path.basename(this.routes[file])
  })

  // defaults
  this.wfPath = options.wfPath || path.join(serverRoot, '/wfPath')
  this.wfRoute = options.wfRoute || '/wfRoute'
  this.seedScript = options.seedScript || path.join(this.wfPath, 'js/wf-seed.js')
  this.userCount = options.userCount || 5
  this.statusBar = options.statusBar // defaults to "true" (undefined)
  this.devMode = options.devMode // defaults to "true" (undefined)

  // non-configurables
  this.count = 0
  this.active = false
  this.fileNames = fileNamesArr
  this.htmlOutput = fileNamesArr.map((file) => `${this.wfPath}/wf-${file}`)
  this.prepCount = Math.floor(this.userCount * 0.75)
  this.stopCount = Math.floor(this.userCount * 0.50)

  // TODO: existsSync is deprecated, need alternative
  if (!fs.existsSync(this.wfPath)) {
    fs.mkdirSync(this.wfPath)
    fs.mkdirSync(path.join(this.wfPath, 'js'))
  }

<<<<<<< HEAD
  // errors
=======
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

>>>>>>> 3e0be8b4773ef2feab7f824c62d2470ef00dcba4
  if (!this.siteUrl) showError('siteUrl')
  if (!this.assetsPath) showError('assetsPath')
  if (!this.assetsRoute) showError('assetsRoute')
  if (!this.routes) showError('routes')
  if (!options) showError('options')
}

WebFlight.prototype.init = function () {
  // TODO: Add 'commentingEJS' back into init

  const htmlFiles = Object.keys(this.routes).map((route) => {
    return this.routes[route]
  })
  const htmlStrings = stringifyFiles(htmlFiles)
  const filesObj = createFilesObj(this.assetsPath, this.assetsRoute)
  const seedObj = createSeedObj(htmlStrings, filesObj)

  hashSeedObj(seedObj)
  .then(writeSeedScript.bind(null, this.seedScript, this.siteUrl, this.stopCount))
  .then(replaceHtml.bind(null, htmlStrings, this.statusBar))
  .then(uncommentingEJS.bind(null))
  .then(writeNewHtml.bind(null, this.htmlOutput))
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
<<<<<<< HEAD
  // TODO: check if these already exist
  child_process.exec('export DISPLAY=\'0:99\'')
  child_process.exec('Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &')

  if (typeof this.devMode === 'undefined') startBots = require('./lib/startBotsDevMode')
  else startBots = require('./lib/startBots')

  startBots(this.seedScript)

=======
  // if devMode is false, create screen for Xvfb to run
  if (!this.devMode) {
    child_process.exec('export DISPLAY=\'0:99\'')
    child_process.exec('Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &')
  }

  botGenerator(this.seedScript)
>>>>>>> 3e0be8b4773ef2feab7f824c62d2470ef00dcba4
  this.active = true
}

WebFlight.prototype.watch = function (req, res, next) {
  const destination = req.originalUrl

  // keep count of users on page, decay after 10 seconds
  if (path.extname(destination) === '.html' || path.extname(destination) === '') {
    ++this.count

    setTimeout(function () { --this.count }.bind(this), 20000)
  }

  // bots check how many current users
  if (destination === '/count.check.4wf') return res.send({count: this.count})
  if (destination === '/bots.no.longer.seeding.4wf') {
    this.active = false
    console.log('bots ending redirect')
  }

  // check when to start and redirect
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
