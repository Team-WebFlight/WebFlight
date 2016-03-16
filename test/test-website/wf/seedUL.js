var WebTorrent = require("webtorrent");
var client = new WebTorrent();

    client.seed('/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/test-website/img/.DS_Store', function(torrent) {
      console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });

    client.seed('/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/test-website/img/bird1.jpg', function(torrent) {
      console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });

    client.seed('/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/test-website/img/bird2.jpg', function(torrent) {
      console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });

    client.seed('/Users/corycaprice/Documents/Programming/Codesmith/WebFlight/test/test-website/img/bird3.jpg', function(torrent) {
      console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });console.log("⌛️ ", "waiting on ", 4, " seeds...")