'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const writeJsDL = require('../../lib/writeJsDL')
const makeFilesObj = require('../../lib/makeFilesObj')
const hashFilesObj = require('../../lib/hashFilesObj')

const filesObj = makeFilesObj(path.join(__dirname, 'files/img'), 'img')
const location = path.join(__dirname, 'files/script.js')

describe('writeJsDL', () => {
  it('should write a file', (done) => {
    hashFilesObj(filesObj).then((obj) => {
      writeJsDL(location, obj)
      assert.equal(fs.statSync(location).isFile(), true)
      fs.unlinkSync(location)
      done()
    })
  })

  it('file should create new WebTorrent client', (done) => {
    hashFilesObj(filesObj).then((obj) => {
      writeJsDL(location, obj)
      assert.equal(fs.readFileSync(location, 'utf8').includes('new WebTorrent()'), true)
      fs.unlinkSync(location)
      done()
    })
  })
})