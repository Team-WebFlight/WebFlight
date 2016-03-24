'use strict'
const fs = require('fs')
const path = require('path')

/**
 * @param {string} | {array} dir - absolute path to directory (or directories) containing content to be seeded
 * @param {string} | {array} route - route (or routes) on the site that will have seeded content
 */
function makeFilesObj (dir, route) {
  // TODO: handle edge cases, make errors
  const returnObject = {}

  //if only one file path given to us, put that one thing into an array, which might change because we
  //will ask them to put it in an array regardless
  if (dir.constructor === String) dir = [dir]
  var filesArray = [] //[resources/img/bird1.jpg,resources/img/bird2.jpg]
  //folder = pathToFolder
  dir.forEach((folder) => {
    // TODO: refactor for fs.readdir
    let files = fs.readdirSync(folder)//array of file names
    filesArray = filesArray.concat(files.map((file) => `${folder}/${file}`))
  })

//  console.log('🍘filesArray',filesArray)
  let routesArr = route.map((r) => {
    // each route r in array should conform to the pattern in provided options object
    if (!r.endsWith('/')) r += '/'
    return r
  })

 //🎈this might be creating an object with all filepaths to every single route
 //we don't need some of the key/vals being created
  routesArr.forEach((route) => {
    filesArray.forEach((file) => {
      returnObject[route + path.basename(file)] = {
        fileOnServer: `${file}`
      }
    })
  })
  //console.log('👾returnObject', returnObject)
  return returnObject
}

module.exports = makeFilesObj
