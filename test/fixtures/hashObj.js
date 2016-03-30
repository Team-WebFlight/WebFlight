const path = require('path')

module.exports = {
  '0': {
    paths:
      [ path.join(__dirname, 'imgs/google.png'),
        path.join(__dirname, 'imgs/apple.png'),
        path.join(__dirname, 'imgs/netflix.png')
      ],
    srcs:
      [ '../imgs/google.png',
        '../imgs/apple.png',
        '../imgs/netflix.png' ],
    hash: 'cd60283e8886468861b5a3e51b67ccc7b1bef317',
    magnet: 'magnet:?xt=urn:btih:cd60283e8886468861b5a3e51b67ccc7b1bef317&dn=google.png&tr=udp://exodus.desync.com:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.internetwarriors.net:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.openbittorrent.com:80&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.fastcast.nz&tr=wss://tracker.openwebtorrent.com&tr=wss://tracker.webtorrent.io'
  }
}
