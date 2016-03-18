var client = new WebTorrent();

    client.add('magnet:?xt=urn:btih:13991928788f049b05a6260d62e1d743571fba75&dn=bird1.jpg&tr=udp://exodus.desync.com:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.internetwarriors.net:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.openbittorrent.com:80&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.fastcast.nz&tr=wss://tracker.openwebtorrent.com&tr=wss://tracker.webtorrent.io', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('13991928788f049b05a6260d62e1d743571fba75'));

      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });

    client.add('magnet:?xt=urn:btih:a6022e9ea276cf01325d9ff68b6d77c2d6a74a78&dn=bird2.jpg&tr=udp://exodus.desync.com:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.internetwarriors.net:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.openbittorrent.com:80&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.fastcast.nz&tr=wss://tracker.openwebtorrent.com&tr=wss://tracker.webtorrent.io', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('a6022e9ea276cf01325d9ff68b6d77c2d6a74a78'));

      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });

    client.add('magnet:?xt=urn:btih:e297b89c4383a4573a9ef92916cd970b7674f9de&dn=bird3.jpg&tr=udp://exodus.desync.com:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.internetwarriors.net:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.openbittorrent.com:80&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.fastcast.nz&tr=wss://tracker.openwebtorrent.com&tr=wss://tracker.webtorrent.io', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('e297b89c4383a4573a9ef92916cd970b7674f9de'));

      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });