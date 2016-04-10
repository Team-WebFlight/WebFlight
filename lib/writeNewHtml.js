'use strict'

const fs = require('fs')

// TODO: check to see if info resolving from previous function still works

function writeNewHtml (fileNames, htmlStrings) {
  htmlStrings.forEach((htmlString, index) => {
    fs.writeFileSync(fileNames[index], htmlString, 'utf8')
  })
}

module.exports = writeNewHtml
