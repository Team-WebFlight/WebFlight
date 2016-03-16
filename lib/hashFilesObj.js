'use strict'

const createTorrent = require('create-torrent')
const parseTorrent = require('parse-torrent')

function hashFilesObj (filesObj) {
  //filesObj = {'/images/cats': {'fileOnServer': 'kitten.jpg'},
  //            '/images/dog': {'fileOnServer': 'puppy.jpg'}
  //           }
  return new Promise((resolve, reject) => {
    const hashObj = filesObj
    const filesArray = Object.keys(filesObj) //['/images/cats','/images/dog']

    //isn't what's happening on line 12 the same thing that .map is being done on  in line 15?
    const filesSrcArray = Object.keys(filesObj).map((file) => {
      //what is fileOnServer: the img/vid file?
      // var hashObj = {'/images/cats': {'fileOnServer': 'kitten.jpg'},
      //                 '/images/dog': {'fileOnServer': 'puppy.jpg'}
      //               }
      return filesObj[file].fileOnServer //'kitten.jpg'
    }) //filesSrcArray = ['kitten.jpg', 'puppy.jpg']

    hashFile(filesSrcArray)
<<<<<<< HEAD

//🎈 We're changing from es6 format for functions back to es5
=======
>>>>>>> 8a2f3e9ac94242250b46a451d2261ae9014ed970
    function hashFile (array) {
      const fileSrc = array.pop() //'puppy.jpg'
      const file = filesArray.pop() // '/images/dog'

      //are we only creating a .torrent File for the last file on filesSrcArray?
      createTorrent(fileSrc, (err, torrent) => {
        if (err) {
          //reject is a promise method that throws away promise(rejects the promise) dependant on the argument
          //here being if err. (Q.So what does this mean for the function if err? Q If promise is thrown away does the next line of code even execute)
          reject(err)
          throw err
        }
        //
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
