'use strict'

const fs = require('fs')

function writeJsDL (output, filesObj) {
  const hashesArray = Object.keys(filesObj).map((files) => filesObj[files].hash)
  const magnetsArray = Object.keys(filesObj).map((files) => filesObj[files].magnet)
  let jsString = 'var client = new WebTorrent();'

  hashesArray.forEach((hash, index) => {
    jsString += `

    client.add('${magnetsArray[index]}', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('${hash}'));

      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });`
  })

  fs.writeFileSync(output, jsString, 'utf8')

  return filesObj
}

module.exports = writeJsDL
