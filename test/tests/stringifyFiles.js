/* global describe, it */
'use strict'
const opts1 = require('../fixtures/opts').opts1
const htmlFile = require('../fixtures/htmlFiles.js').route2
const htmlFiles = require('../fixtures/htmlFiles.js').route1
const stringifyFiles = require('../../lib/stringifyFiles')
const chai = require('chai')
let expect = chai.expect

const singleHtml = stringifyFiles(htmlFile)
const manyHtml = stringifyFiles(htmlFiles)

describe('stringifyFiles', () => {
  it('should output an array', () => {
    let output = stringifyFiles([opts1.routes['/'], opts1.routes['/how.html']])
    expect(output).to.be.an('array')
  })
  it('should output an array of strings', () => {
    let output = stringifyFiles([opts1.routes['/'], opts1.routes['/how.html']])
    expect(output[0]).to.be.an('string')
  })
  it('should return an array if input is an array', () => {
    expect(htmlFiles).to.not.be.a('string')
    expect(htmlFiles).to.be.a('array')
  })
  it('should return an array of the same length as the input', () => {
    expect(htmlFile.length).to.equal(singleHtml.length)
    expect(htmlFiles.length).to.equal(manyHtml.length)
  })
  it('each index of array output should be a string', () => {
    manyHtml.forEach((file) => {
      expect(file).to.be.a('string')
    })
  })
})
