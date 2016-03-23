'use strict'

const fs = require('fs')
const path = require('path')

function writeJsUL (output, url, stopCount, filesObj) {
  const allExtsArray = ['.mp4', '.m4v', '.webm', '.m4a', '.mp3', '.wav', '.aac', '.ogg', '.oga', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.css', '.html', '.js', '.md', '.pdf', '.txt']
  const filesArray = Object.keys(filesObj).map((files) => {
    return filesObj[files].fileOnServer
  })

  let totalSeeds = 0
  let jsString = 'var http = require("http");\n var WebTorrent = require("webtorrent");\n' + 'var client = new WebTorrent();\n'



  filesArray.forEach((file) => {
    if (allExtsArray.indexOf(path.extname(file)) < 0) return
    if (!jsString.includes(file)) {
      totalSeeds++
      jsString += `

      client.seed('${file}', function(torrent) {
        --totalSeeds;
        console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);

        if (!totalSeeds) console.log("🕊 all seeds active")
      });`
    }
  })

  jsString += 'console.log("⌛️ ", "waiting on ", totalSeeds, " seeds...");'
  jsString += `setInterval(function() {
    http.get('${url}/count.check.4wf', function(response) {
      response.on('data', function(data) {
        data = JSON.parse(data);

        if (data.count < ${stopCount}) {
          console.log("😴 bots going offline")
          http.get('${url}/bots.no.longer.seeding.4wf')
          require('remote').require('app').quit()
        }
      });
    });
  }, 600000);`

  jsString = `var totalSeeds = ${totalSeeds};` + '\n' + `console.log('xurls', ${process.env.GAE_APPENGINE_HOSTNAME})` + '\n' + jsString

  fs.writeFileSync(output, jsString, 'utf8')

  return filesObj
}

module.exports = writeJsUL


