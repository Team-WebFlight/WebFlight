'use strict'

console.log('temp file for seeding contents')

// Need to figure out how to get the count number here to stop bots
// if (req.headers.count === stop) {
//   console.log('kill bots here')
//   require('remote').require('app').quit()
// }
// const hello = true
//
// if (hello) {
//   console.log('hello')
//   require('remote').require('app').quit()
// }

// 'files' is hashed files object
// const files = require('test/wf/...')
// const WebTorrent = require('webtorrent')
// const client = new WebTorrent()

// let fileCon = new FileConstructor()

let FileConstructor = {
  kill: function () {
    console.log('killing')
    require('remote').require('app').quit()
  }
}

// FileConstructor.prototype.seed = function () {
//   console.log('seeding')
// }
//
// FileConstructor.prototype.kill = function () {
//   console.log('killing')
//   require('remote').require('app').quit()
// }

module.exports = FileConstructor
