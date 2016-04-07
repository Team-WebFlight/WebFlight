/* global describe, it */
'use strict'

const commentingEjsFunc = require('../../lib/commentingEJS.js')
const ejsString = require('../fixtures/stringejs.js').string
const ejsStringCommented = require('../fixtures/stringejs.js').commentedString
const chai = require('chai')
let assert = chai.assert

describe('commentingEjsFunc', () => {
  it('should still be a string', () => {
    let output = commentingEjsFunc(ejsString)
    assert.isString(output, 'writes string')
  })
  it('should output an ejs string with commented out snowcones', () => {
    let output = commentingEjsFunc(ejsString)
    assert.equal(output, ejsStringCommented, 'strings are == ')
  })
})

