'use strict'

const fs = require('fs')

function writeJsUL (output, filesObj) {
  console.log(filesObj)
  return new Promise((resolve, reject) => {
    const filesArray = Object.keys(filesObj).map((files) => {
      return filesObj[files].fileOnServer
    })

    let jsString = 'var WebTorrent = require("webtorrent");\n' + 'var client = new WebTorrent();'

    filesArray.forEach((file) => {
      jsString += `

      client.seed('${file}', function(torrent) {
        console.log(torrent.infoHash);
      });`
    })

    fs.writeFileSync(output, jsString, 'utf8')
    resolve(filesObj)
  })
}

module.exports = writeJsUL
