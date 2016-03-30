var totalSeeds = 2;
var http = require('http');
var WebTorrent = require('webtorrent');
var client = new WebTorrent();

client.seed(['/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/fixtures/test-website/img/bird1.jpg','/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/fixtures/test-website/img/bird2.jpg','/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/fixtures/test-website/videos/birdVid.mp4','/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/fixtures/test-website/videos/birdVid.ogv'], function(torrent) {
  --totalSeeds;

  console.log('🐣 ', torrent.files.map((file) => file.name).slice(0,3).join(', '), 'etc., now seeding at hash ', torrent.infoHash);

  if (!totalSeeds) console.log('🕊 all seeds active')
});

client.seed(['/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/fixtures/test-website/img/google.png'], function(torrent) {
  --totalSeeds;

  console.log('🐣 ', torrent.files.map((file) => file.name).slice(0,3).join(', '), 'etc., now seeding at hash ', torrent.infoHash);

  if (!totalSeeds) console.log('🕊 all seeds active')
});

console.log('⌛️ ', 'waiting on ', totalSeeds, ' seeds...');
setInterval(function() {
  http.get('http://localhost:3000/count.check.4wf', function(response) {
    response.on('data', function(data) {
      data = JSON.parse(data);

      if (data.count < 2) {
        console.log('😴 bots going offline')
        http.get('http://localhost:3000/bots.no.longer.seeding.4wf')
        require('remote').require('app').quit()
      }
    });
  });
}, 600000);

