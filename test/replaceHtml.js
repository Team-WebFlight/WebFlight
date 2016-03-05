var assert = require('assert')
var fs = require('fs')
var replaceHtml = require('./../replaceHtml')

var html = fs.readFileSync(__dirname + '/replaceHtml/index.html', 'utf8')
var replacedHtml = fs.readFileSync(__dirname + '/replaceHtml/index2.html', 'utf8')
var hashObj = {
  'https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js': '923ad49f0ca1962716d34bd60433de8a207570f7'
}

describe('replaceHtml', function() {
  it('should replace src attribute with class attribute', function() {
    assert.equal(replacedHtml, replaceHtml(html, hashObj))
  })  
})