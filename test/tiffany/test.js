'use strict'
const assert = require('assert')
const WebFlight = require('../..')
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const stringifyHtml = require('../../lib/stringifyHtml')
const makeFilesObj = require('../../lib/makeFilesObj')
const hashFilesObj = require('../../lib/hashFilesObj')
const writeJsDL = require('../../lib/writeJsDL')

const webflightOptions = {
  originalHtml: path.join(__dirname, 'index.html'),
  filesFolder: path.join(__dirname, 'img'),
  filesRoute: 'img/',
  jsOutputDL: path.join(__dirname, 'webflight.js'),
  jsOutputUL: path.join(__dirname, 'wf/seedUL.js'),
  htmlOutput: path.join(__dirname, 'wf/index.html'),
  route: '/'
}

var wf = new WebFlight({
  routes: {
    '/aboutroute.html': 'users/baoyee/codesmith/about.html',
    '/indexroute.html': 'users/baoyee/codesmith/index.html',
    '/inforoute.html': 'users/baoyee/codesmith/info.html'
  },
  siteUrl: 'http://www.google.com'
})

app.listen(3000, () => {
  // console.log('listening on 3000')
})

app.get('/', (req, res) => {
  console.error('trying error')
  // res.sendfile(console.error('hello'))
})

console.log(wf)
// console.log(path.basename(path.join(__dirname, 'index.html')))
// const filesObj = makeFilesObj(webflightOptions.filesFolder, webflightOptions.filesRoute)
// const result = writeJsDL(webflightOptions.jsOutputDL, filesObj)
// result.then((val) => {
//   console.log(val);
// })
// console.log(result);
// const beforeString = webflightOptions.originalHtml
// const string = stringifyHtml(webflightOptions.originalHtml)
// console.log(typeof string)
// fs.writeFileSync(path.join(__dirname, 'hi.js'), 'JS!', 'utf8')
// hashFilesObj(filesObj).then((val) => {
//   writeJsDL(webflightOptions.jsOutputDL, val).then((another) => {
//     console.log('inside writeJSDL: ', another)
//   })
// })
