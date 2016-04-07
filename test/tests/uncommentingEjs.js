/* global describe, it */
'use strict'

const commentingEjsFunc = require('../../lib/commentingEJS.js')
const ejsString = require('../fixtures/stringejs.js').string
const chai = require('chai')
let expect = chai.expect

describe('uncommentingEjsFunc', () => {
  it('should still be a string', () => {
    let output = commentingEjsFunc(ejsString)
    expect(output).to.be.a('string')
  })
})
