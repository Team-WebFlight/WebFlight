var WebTorrent = require("webtorrent");
var client = new WebTorrent();

    client.seed('/Users/Baoyee/Codesmith/WebFlight/test/tiffany/img/bird1.jpg', function(torrent) {
      console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });

    client.seed('/Users/Baoyee/Codesmith/WebFlight/test/tiffany/img/bird2.jpg', function(torrent) {
      console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });

    client.seed('/Users/Baoyee/Codesmith/WebFlight/test/tiffany/img/bird3.jpg', function(torrent) {
      console.log('🐣 ', torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
    });console.log("⌛️ ", "waiting on ", 3, " seeds...")