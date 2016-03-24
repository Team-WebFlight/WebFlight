var totalSeeds = 5;
console.log('xurls', undefined)
var http = require("http");
 var WebTorrent = require("webtorrent");
var client = new WebTorrent();


      client.seed('/Users/carolgonzalez/Desktop/WebFlight/test/test-website/img/bird1.jpg', function(torrent) {
        --totalSeeds;
        console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);

        if (!totalSeeds) console.log("🕊 all seeds active")
      });

      client.seed('/Users/carolgonzalez/Desktop/WebFlight/test/test-website/img/bird1a.jpg', function(torrent) {
        --totalSeeds;
        console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);

        if (!totalSeeds) console.log("🕊 all seeds active")
      });

      client.seed('/Users/carolgonzalez/Desktop/WebFlight/test/test-website/img/bird2.jpg', function(torrent) {
        --totalSeeds;
        console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);

        if (!totalSeeds) console.log("🕊 all seeds active")
      });

      client.seed('/Users/carolgonzalez/Desktop/WebFlight/test/test-website/img/google.png', function(torrent) {
        --totalSeeds;
        console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);

        if (!totalSeeds) console.log("🕊 all seeds active")
      });

      client.seed('/Users/carolgonzalez/Desktop/WebFlight/test/test-website/videos/birdVid.mp4', function(torrent) {
        --totalSeeds;
        console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);

        if (!totalSeeds) console.log("🕊 all seeds active")
      });console.log("⌛️ ", "waiting on ", totalSeeds, " seeds...");setInterval(function() {
    http.get('http://localhost:3000/count.check.4wf', function(response) {
      response.on('data', function(data) {
        data = JSON.parse(data);

        if (data.count < 1) {
          console.log("😴 bots going offline")
          http.get('http://localhost:3000/bots.no.longer.seeding.4wf')
          require('remote').require('app').quit()
        }
      });
    });
  }, 600000);