'use strict'

const assert = require('assert')

const makeFilesObj = require('../../lib/makeFilesObj')
const route = 'img/'

describe('makeFilesObj', (done) => {
  it('should return an object', () => {
    assert.equal(makeFilesObj(__dirname, route).constructor, Object)
  })

  it('object properties should be objects', () => {
    const fileObj = makeFilesObj(__dirname, route)
    const fileObjKeys = Object.keys(fileObj)

    assert.equal(fileObj[fileObjKeys[0]].constructor, Object)
  })

  it('object property names should include route', () => {
    const fileObj = makeFilesObj(__dirname, route)
    const fileObjKeys = Object.keys(fileObj)

    assert.equal(fileObjKeys[0].includes(route), true)
  })

  it('should return same object even if /route or route/ is used', () => {
    assert.deepEqual(makeFilesObj(__dirname, '/img'), makeFilesObj(__dirname, 'img/'))
  })
})
