/* global describe, it */
'use strict'
const path = require('path')
const cheerio = require('cheerio')
const chai = require('chai')
let assert = chai.assert
let expect = chai.expect

const chaifs = require('chai-fs')
// chai.use(chaiAsPromised)
chai.use(chaifs)

// Functions being tested
const stringifyHtml = require('../../lib/stringifyHtml')
const makeFilesObj = require('../../lib/makeFilesObj')
const hashFilesObj = require('../../lib/hashFilesObj')
const writeJsDL = require('../../lib/writeJsDL')
const writeJsUL = require('../../lib/writeJsUL')
const replaceHtml = require('../../lib/replaceHtml')

// Testing input
const wfOptions = {
  originalHtml: path.join(__dirname, 'index.html'),
  filesFolder: path.join(__dirname, 'img'),
  filesRoute: 'img/',
  jsOutputDL: path.join(__dirname, 'webflight.js'),
  jsOutputUL: path.join(__dirname, 'wf/seedUL.js'),
  htmlOutput: path.join(__dirname, 'wf/index.html'),
  route: '/'
}

// Testing variables
const stringifiedHtml = stringifyHtml(path.join(__dirname, 'index.html'))
// const stringifiedHtmlArr = stringifyHtml([path.join(__dirname, 'index.html'), path.join(__dirname, 'about.html')])
const filesObj = makeFilesObj(wfOptions.filesFolder, wfOptions.filesRoute)
const hashedObjFunc = hashFilesObj(filesObj)

// Testing begins
describe('stringifyHtml', () => {
  it('output should not equal path', () => {
    assert.notEqual(wfOptions.originalHtml, stringifiedHtml)
  })
  it('should return a string if single input', () => {
    expect(stringifiedHtml).to.be.a('string')
  })
  it('should return an array if multiple inputs', () => {
    // expect(stringifiedHtmlArr).to.be.a('array')
  })
})

describe('makeFilesObj', function () {
  it('should return array of files in directory', function () {
    const array = makeFilesObj(path.join(__dirname + '/test-dir'), 'files/')

    assert.deepEqual({
      'files/index.html': {fileOnServer: `${__dirname}/test-dir/index.html`},
      'files/index2.html': {fileOnServer: `${__dirname}/test-dir/index2.html`}
    }, array)
  })
  it('should work with array of directories and single route', function () {
    const filesObj = makeFilesObj([path.join(__dirname, '/test-dir2'), path.join(__dirname, '/test-dir')], '/files')

    assert.deepEqual({
      'files/webtorrent-breaks-if-folder-is-empty': {fileOnServer: `${__dirname}/test-dir2/webtorrent-breaks-if-folder-is-empty`},
      'files/t.txt': {fileOnServer: `${__dirname}/test-dir2/t.txt`},
      'files/index.html': {fileOnServer: `${__dirname}/test-dir/index.html`},
      'files/index2.html': {fileOnServer: `${__dirname}/test-dir/index2.html`}
    }, filesObj)
  })

  it('should work with array of directories and array of routes', function () {
    const filesObj = makeFilesObj([path.join(__dirname, '/test-dir2'), path.join(__dirname, '/test-dir')], ['/files', '/img'])

    assert.deepEqual({
      'files/webtorrent-breaks-if-folder-is-empty': {fileOnServer: `${__dirname}/test-dir2/webtorrent-breaks-if-folder-is-empty`},
      'files/t.txt': {fileOnServer: `${__dirname}/test-dir2/t.txt`},
      'files/index.html': {fileOnServer: `${__dirname}/test-dir/index.html`},
      'files/index2.html': {fileOnServer: `${__dirname}/test-dir/index2.html`},
      'img/webtorrent-breaks-if-folder-is-empty': {fileOnServer: `${__dirname}/test-dir2/webtorrent-breaks-if-folder-is-empty`},
      'img/t.txt': {fileOnServer: `${__dirname}/test-dir2/t.txt`},
      'img/index.html': {fileOnServer: `${__dirname}/test-dir/index.html`},
      'img/index2.html': {fileOnServer: `${__dirname}/test-dir/index2.html`}
    }, filesObj)
  })
})

describe('hashFilesObj', () => {
  it('expect hashedObj to have correct keys', () => {
    const hashedObjFunc = hashFilesObj(filesObj)
    return hashedObjFunc.then((hashedObj) => {
      for (var info in hashedObj) {
        expect(hashedObj[info]).to.have.all.keys('hash', 'magnet', 'fileOnServer')
      }
    })
  })
  it('should return a promise', () => {
    assert.equal(hashFilesObj(filesObj).constructor, Promise)
  })
  it('promise should return an object', (done) => {
    hashFilesObj(filesObj).then((result) => {
      assert.equal(result.constructor, Object)
      done()
    })
  })
  it('every property on object should be an object', (done) => {
    hashFilesObj(filesObj).then((result) => {
      assert.equal(Object.keys(result).every((key) => {
        return result[key].constructor === Object
      }), true)
      done()
    })
  })
  it('every property object should have a hash property', (done) => {
    hashFilesObj(filesObj).then((result) => {
      assert.equal(Object.keys(result).every((key) => {
        return result[key].hasOwnProperty('hash')
      }), true)
      done()
    })
  })
  it('every property object should have a magnet property', (done) => {
    hashFilesObj(filesObj).then((result) => {
      assert.equal(Object.keys(result).every((key) => {
        return result[key].hasOwnProperty('magnet')
      }), true)
      done()
    })
  })
})

describe('writeJsDL', () => {
  const wfFile = wfOptions.jsOutputDL
  const wfFileString = stringifyHtml(wfFile)
  it('output (webflight.js) file is created', () => {
    return hashedObjFunc.then((hashedObj) => {
      writeJsDL(wfFile, hashedObj)
      assert.isFile(wfFile)
    })
  })
  it('file should "client.add" all files in obj', () => {
    expect(wfFileString).to.include('client.add')
    expect(wfFileString).to.not.include('undefined')
  })
  it('file should contain all magnet uris and hashes', () => {
    return hashedObjFunc.then((hashedObj) => {
      for (let file in hashedObj) {
        expect(wfFileString).to.include(hashedObj[file].magnet)
        expect(wfFileString).to.include(hashedObj[file].hash)
      }
    })
  })
})
// check if option is undefined
describe('writeJsUL', () => {
  const ULFile = wfOptions.jsOutputUL
  const ULFileString = stringifyHtml(ULFile)
  it('output (wf/seedUL.js) is created', () => {
    return hashedObjFunc.then((hashedObj) => {
      writeJsUL(ULFile, hashedObj)
      assert.isFile(ULFile)
    })
  })
  it('file should "client.seed" all files in obj', () => {
    expect(ULFileString).to.include('client.seed')
    expect(ULFileString).to.not.include('undefined')
  })
  it('file should contain correct file paths to seed', () => {
    return hashedObjFunc.then((hashedObj) => {
      for (let file in hashedObj) {
        expect(ULFileString).to.include(hashedObj[file].fileOnServer)
      }
    })
  })
})

describe('replaceHtml', () => {
  it('WebTorrent and WebFlight scripts should be appended to page', () => {
    return hashedObjFunc.then((hashedObj) => {
      let replacedString = replaceHtml(stringifiedHtml, wfOptions.htmlOutput, hashedObj)
      expect(replacedString).to.include('webtorrent.min.js')
      // expect(replacedString).to.include('webflight.js')
      expect(replacedString).to.not.include('undefined')
    })
  })
  it('content with hash classes should not contain source attributes', () => {
    return hashedObjFunc.then((hashedObj) => {
      let replacedString = replaceHtml(stringifiedHtml, wfOptions.htmlOutput, hashedObj)
      const $ = cheerio.load(replacedString)
      const bird1Tag = $(`.${hashedObj['img/bird1.jpg'].hash}`).attr('src')
      const bird2Tag = $(`.${hashedObj['img/bird2.jpg'].hash}`).attr('src')
      expect(bird1Tag).to.be.an('undefined')
      expect(bird2Tag).to.be.an('undefined')
    })
  })
  it('html should contain all file hashes as class names', () => {
    return hashedObjFunc.then((hashedObj) => {
      let replacedString = replaceHtml(stringifiedHtml, wfOptions.htmlOutput, hashedObj)
      expect(replacedString).to.include(hashedObj['img/bird1.jpg'].hash)
      expect(replacedString).to.include(hashedObj['img/bird2.jpg'].hash)
    })
  })
})
