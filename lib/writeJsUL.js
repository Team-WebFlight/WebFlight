'use strict'

const fs = require('fs')

function writeJsUL (output, filesObj) {
  return new Promise((resolve, reject) => {
    const hashesArray = Object.keys(filesObj).map((files) => {
      return filesObj[files].fileOnServer
    })

    let jsString = 'var WebTorrent = require("webtorrent");\n' + 'var client = new WebTorrent();'

    hashesArray.forEach((hash) => {
      jsString += `

      client.seed('${hash}', function(torrent) {
        console.log(torrent.infoHash);
      });`
    })

    fs.writeFileSync(output, jsString, 'utf8')
    resolve(filesObj)
  })
}

module.exports = writeJsUL
