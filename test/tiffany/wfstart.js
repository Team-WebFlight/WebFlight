/* global describe, it */
'use strict'

// Testing requirements
const path = require('path')
const chai = require('chai')
let assert = chai.assert
let expect = chai.expect
// let should = chai.should
const chaiAsPromised = require('chai-as-promised')
const chaifs = require('chai-fs')
chai.use(chaiAsPromised)
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
const filesObj = makeFilesObj(wfOptions.filesFolder, wfOptions.filesRoute)
const fileNames = Object.keys(filesObj)
const hashedObjFunc = hashFilesObj(filesObj)
// let hashedObj = hashedObjFunc.then((hashedObject) => {
//   return hashedObject
// })

// Testing begins
describe('stringifyHtml', () => {
  it('output should not equal path', () => {
    assert.notEqual(wfOptions.originalHtml, stringifiedHtml)
  })
  it('should return a string if single input', () => {
    expect(stringifiedHtml).to.be.a('string')
  })
  it('should return an array if multiple outputs', () => {
    // expect output to be an array
    // (create a separate test case)
  })
})

// should work for arrays, if array, find number of route/file iterations and make sure number of keys matches
describe('makeFilesObj', () => {
  it('expect output to have file names as keys', () => {
    fileNames.forEach(function (file) {
      expect(filesObj).to.have.property(file)
    })
  })
  it('for arrays, check to see if all route/file iterations have been created', () => {
    //
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
// don't check if ALL src tags are removed (e.g. imgur)
describe('replaceHtml', () => {
  it('WebTorrent and WebFlight scripts should be appended to page', () => {
    return hashedObjFunc.then((hashedObj) => {
      let replacedString = replaceHtml(stringifiedHtml, wfOptions.htmlOutput, hashedObj))
    })
  })
  it('html should not contain any source attributes', () => {
  })
  it('html should contain all file hashes as class names', () => {
    // might want to include cheerio to search through document
  })
})
//
// describe('writeNewHtml', () => {
//   it('', () => {
//   })
// })
//
// describe('botGenerator', () => {
//   it('', () => {
//   })
// })
