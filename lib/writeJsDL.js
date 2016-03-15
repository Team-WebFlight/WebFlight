'use strict'

const fs = require('fs')

function writeJsDL (output, filesObj) {
  return new Promise((resolve, reject) => {
    const hashesArray = Object.keys(filesObj).map((files) => filesObj[files].hash)
    const magnetsArray = Object.keys(filesObj).map((files) => filesObj[files].magnet)
    let jsString = '$(document).ready(function() {\n' + 'var client = new WebTorrent();'

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

    jsString += '});'

    fs.writeFileSync(output, jsString, 'utf8')
    resolve(filesObj)
  })
}

module.exports = writeJsDL
