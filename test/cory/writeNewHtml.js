'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const writeNewHtml = require('../../lib/writeNewHtml')

const location = path.join(__dirname, 'files/new.html')

describe('writeNewHtml', () => {
  it('should write new file', (done) => {
    writeNewHtml(location, 'hello').then((results) => {
      assert.equal(fs.statSync(location).isFile(), true)
      fs.unlinkSync(location)
      done()
    })
  })
})