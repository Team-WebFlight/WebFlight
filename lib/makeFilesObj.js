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

  if (dir.constructor === String) dir = [dir]
  var filesArray = []
  dir.forEach((folder) => {
    // TODO: refactor for fs.readdir
    let files = fs.readdirSync(folder)
    filesArray = filesArray.concat(files.map((file) => `${folder}/${file}`))
  })

  let routesArr = route.map((r) => {
    // each route r in array should conform to the pattern in provided options object
    if (!r.endsWith('/')) r += '/'
    return r
  })

  routesArr.forEach((route) => {
    filesArray.forEach((file) => {
      returnObject[route + path.basename(file)] = {
        fileOnServer: `${file}`
      }
    })
  })
  return returnObject
}

module.exports = makeFilesObj
