var totalSeeds = 0;
console.log('xurls', undefined)
var http = require("http");
 var WebTorrent = require("webtorrent");
var client = new WebTorrent();
console.log("⌛️ ", "waiting on ", totalSeeds, " seeds...");setInterval(function() {
    http.get('http://localhost:3000/count.check.4wf', function(response) {
      response.on('data', function(data) {
        data = JSON.parse(data);

        if (data.count < 2) {
          console.log("😴 bots going offline")
          http.get('http://localhost:3000/bots.no.longer.seeding.4wf')
          require('remote').require('app').quit()
        }
      });
    });
  }, 600000);