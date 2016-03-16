'use strict'

const fs = require('fs')

function writeNewHtml (fileName, htmlString) {
  fs.writeFileSync(fileName, htmlString, 'utf8')
}

module.exports = writeNewHtml
