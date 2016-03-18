'use strict'

const fs = require('fs')

function writeNewHtml (fileNames, htmlStrings) {
  htmlStrings.forEach((htmlString, index) => {
    fs.writeFileSync(fileNames[index], htmlString, 'utf8')
  })
}

module.exports = writeNewHtml
