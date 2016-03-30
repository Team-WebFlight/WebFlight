'use strict'

const fs = require('fs')

function writeSeedScript (output, url, stopCount, seedObj) {
  const seedsArray = Object.keys(seedObj).map((seed) => seedObj[seed].paths)

  let totalSeeds = 0
  let jsString = 'var http = require(\'http\');\n' +
    'var WebTorrent = require(\'webtorrent\');\n' +
    'var client = new WebTorrent();'

  seedsArray.forEach((seed) => {
    totalSeeds++
    jsString += `

client.seed([${seed.map((file) => `'${file}'`)}], function(torrent) {
  --totalSeeds;

  console.log('🐣 ', torrent.files.map((file) => file.name).slice(0,3).join(', '), 'etc., now seeding at hash ', torrent.infoHash);

  if (!totalSeeds) console.log('🕊 all seeds active')
});

`
  })

  jsString += 'console.log(\'⌛️ \', \'waiting on \', totalSeeds, \' seeds...\');'
  jsString += `
setInterval(function() {
  http.get('${url}/count.check.4wf', function(response) {
    response.on('data', function(data) {
      data = JSON.parse(data);

      if (data.count < ${stopCount}) {
        console.log('😴 bots going offline')
        http.get('${url}/bots.no.longer.seeding.4wf')
        require('remote').require('app').quit()
      }
    });
  });
}, 600000);

`

  jsString = `var totalSeeds = ${totalSeeds};` + '\n' + jsString

  fs.writeFileSync(output, jsString, 'utf8')

  return seedObj
}

module.exports = writeSeedScript
