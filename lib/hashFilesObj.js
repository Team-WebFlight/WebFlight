'use strict'

const createTorrent = require('create-torrent')
const parseTorrent = require('parse-torrent')

function hashFilesObj (filesObj) {
  return new Promise((resolve, reject) => {
    const hashObj = filesObj
    const filesArray = Object.keys(filesObj)
    const filesSrcArray = Object.keys(filesObj).map((file) => {
      return filesObj[file].fileOnServer
    })

    hashFile(filesSrcArray)

    function hashFile (array) {
      const fileSrc = array.pop()
      const file = filesArray.pop()

      createTorrent(fileSrc, (err, torrent) => {
        if (err) {
          reject(err)
          throw err
        }

        const tor = parseTorrent(torrent)
        const hash = tor.infoHash
        const filename = tor.files[0].name
        const trackers = tor.announce.map((tracker) => {
          return `tr=${tracker}`
        }).join('&')

        let magnetURI = `magnet:?xt=urn:btih:${hash}&dn=${filename}&${trackers}`

        hashObj[file].hash = hash
        hashObj[file].magnet = magnetURI

        if (array.length) {
          hashFile(array)
        } else {
          resolve(hashObj)
        }
      })
    }
  })
}

module.exports = hashFilesObj
