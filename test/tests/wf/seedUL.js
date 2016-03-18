var WebTorrent = require("webtorrent");
var client = new WebTorrent();
    client.seed('/home/jared/Development/WebFlight/test/tests/img/bird1.jpg', function(torrent) {
        console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
      });
    client.seed('/home/jared/Development/WebFlight/test/tests/img/bird2.jpg', function(torrent) {
        console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
      });
    client.seed('/home/jared/Development/WebFlight/test/tests/img/bird3.jpg', function(torrent) {
        console.log('🐣 ',torrent.files[0].name, ' now seeding at hash ', torrent.infoHash);
      });console.log("⌛️ ", "waiting on ", 3, " seeds...")