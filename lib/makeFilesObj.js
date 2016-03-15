'use strict'
const fs = require('fs')
const path = require('path')

/**
 * @param {string} dir
 */
function makeFilesObj (dir, route) {
  if (route.startsWith('/')) route = route.slice(1)
  if (!route.endsWith('/')) route += '/'

  const filesArray = fs.readdirSync(dir)
  const filesObj = {}

  filesArray.forEach((file) => {
    filesObj[route + file] = {
      // Question: How will dir resolve and will I be able to use this path to find the file?
      fileOnServer: `${dir}/${file}`
    }
  })

  return filesObj
}

module.exports = makeFilesObj
