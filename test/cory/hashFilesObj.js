'use strict'

const assert = require('assert')

const hashFilesObj = require('../../lib/hashFilesObj')
const makeFilesObj = require('../../lib/makeFilesObj')

const filesObj = makeFilesObj(__dirname, '/img')

describe('hashFilesObj', () => {
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
