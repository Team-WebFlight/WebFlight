/* global describe, it */
'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const stringifyHtmlFiles = require('../../lib/stringifyHtmlFiles')

const WebFlight = require('../..')

const wf = new WebFlight({
  routes: {
    '/index.html': path.join(__dirname, 'files/index.html'),
    '/about.html': path.join(__dirname, 'files/about.html')
  }
})

describe('stringifyHtmlFiles', () => {
  const htmlFiles = Object.keys(wf.routes).map((route) => wf.routes[route])

  it('should return an array', () => {
    assert.equal(Array.isArray(stringifyHtmlFiles(htmlFiles)), true)
  })

  it('should return an array of strings', () => {
    assert.equal(stringifyHtmlFiles(htmlFiles).every((elem) => {
      return elem.constructor === String
    }), true)
  })

  it('should not return its input', () => {
    assert.notDeepEqual(stringifyHtmlFiles(htmlFiles), htmlFiles)
  })
})

