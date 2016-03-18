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
  // build from collection of directories
  if (Array.isArray(dir)) {
    var filesArray = []
    dir.forEach((folder) => {
      // TODO: refactor for fs.readdir
      let files = fs.readdirSync(folder)
      filesArray = filesArray.concat(files.map((file) => `${folder}/${file}`))
    })

    // check for collection of routes
    if (Array.isArray(route)) {
      let routesArr = route.map((r) => {
        // each route r in array should conform to the pattern 'route/name/'
        if (r.startsWith('/')) r = r.slice(1)
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
    } else {
      // route is single string
      if (route.startsWith('/')) route = route.slice(1)
      if (!route.endsWith('/')) route += '/'

      filesArray.forEach((file) => {
        returnObject[route + path.basename(file)] = {
          fileOnServer: file
        }
      })
      return returnObject
    }
  } else {
    let filesArray = fs.readdirSync(dir)

    // dir is single path, route is a collection of routesArr
    if (Array.isArray(route)) {
      let routesArr = route.map((r) => {
        // each route r in array should conform to the pattern 'route/name/'
        if (r.startsWith('/')) r = r.slice(1)
        if (!r.endsWith('/')) r += '/'
        return r
      })

      routesArr.forEach((r) => {
        filesArray.forEach((file) => {
          returnObject[r + file] = {
            fileOnServer: `${dir}/${file}`
          }
        })
      })
      return returnObject
    } else {
      // both dir and route are strings
      if (route.startsWith('/')) route = route.slice(1)
      if (!route.endsWith('/')) route += '/'

      filesArray.forEach((file) => {
        returnObject[route + file] = {
          fileOnServer: `${dir}/${file}`
        }
      })
      return returnObject
    }
  }
}

module.exports = makeFilesObj
