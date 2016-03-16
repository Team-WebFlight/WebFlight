'use strict'

const path = require('path')
const assert = require('assert')

const replaceHtml = require('../../lib/replaceHtml')
const stringifyHtml = require('../../lib/stringifyHtml')
const makeFilesObj = require('../../lib/makeFilesObj')
const hashFilesObj = require('../../lib/hashFilesObj')

const filesObj = makeFilesObj(path.join(__dirname, 'files/img'), 'img')
const htmlString = stringifyHtml(path.join(__dirname, 'files/index.html'))

describe('replaceHtml', () => {
  it('should return a string', (done) => {
    hashFilesObj(filesObj).then((obj) => {
      replaceHtml(htmlString, filesObj).then((results) => {
        assert.equal(results.constructor, String)
        done()
      })
    })
  })

  it('should add class hash', (done) => {
    // webtorrent.png
    const hash = 'dbb7837a27b9741b224ad7b65f631813a9a23f45'

    hashFilesObj(filesObj).then((obj) => {
      replaceHtml(htmlString, filesObj).then((results) => {
        assert.equal(results.includes(`class="${hash}"`), true)
        done()
      })
    })
  })
})