/* global describe, it */
'use strict'

const commentingEjsFunc = require('../../lib/commentingEJS.js')
const commentedSnowcones = require('../fixtures/commentedSnowcones.js')
const ejsString = require('../fixtures/stringejs.js')
const chai = require('chai')
let expect = chai.expect

describe('commentingEjsFunc', () => {
  it('should still be a string', () => {
    let output = commentingEjsFunc(ejsString)
    expect(output).to.be.a('string')
  })
  it('should output an ejs string with commented out snowcones', () => {
    let output = commentingEjsFunc(ejsString)
    expect(output).to.equal(commentedSnowcones)
  })
})
