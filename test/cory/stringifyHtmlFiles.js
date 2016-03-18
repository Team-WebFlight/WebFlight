'use strict'

const path = require('path')
const assert = require('assert')

const stringifyHtml = require('../../lib/stringifyHtml')

describe('stringifyHtml', (done) => {
 it('should turn file into string', () => {
   assert.equal(stringifyHtml(path.join(__dirname, 'files/index.html')).constructor, String)
 })

 it('should not return a buffer object', () => {
   assert.notEqual(stringifyHtml(path.join(__dirname, 'files/index.html')).constructor, Buffer)
 })
})
