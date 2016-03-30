/* globals describe, it */

'use strict'

const chai = require('chai')
const assert = chai.assert

const replaceHtml = require('../../lib/replaceHtml')
const htmlStrings = require('../fixtures/htmlStrings')
const hashObj = require('../fixtures/hashObj')
const sampleNewHtml = require('../fixtures/newHtml.js')

const newHtml = replaceHtml(htmlStrings, hashObj)

describe('replaceHtml', () => {
  it('should return an array', () => {
    assert.equal(Array.isArray(newHtml), true)
  })

  it('array should contain an array and an object', () => {
    assert.equal((Array.isArray(newHtml[0]) && newHtml[1].constructor === Object), true)
  })

  it('inner array length should match input array length', () => {
    assert.equal(newHtml[0].length, htmlStrings.length)
  })

  // it('inner array should return expected array of strings', () => {
  //   assert.deepEqual(newHtml[0], sampleNewHtml)
  // })
})
