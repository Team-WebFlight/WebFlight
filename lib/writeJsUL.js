'use strict'

const fs = require('fs')

function writeJsUL (output, filesObj) {
  const filesArray = Object.keys(filesObj).map((files) => {
    return filesObj[files].fileOnServer
  })

  let jsString = 'var WebTorrent = require("webtorrent");\n' + 'var client = new WebTorrent();'

  filesArray.forEach((file) => {
    jsString += `

    client.seed('${file}', function(torrent) {
      console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });`
  })

  jsString += `console.log("⌛️ ", "waiting on ", ${filesArray.length}, " seeds...")`

  fs.writeFileSync(output, jsString, 'utf8')

  return filesObj
}

module.exports = writeJsUL
