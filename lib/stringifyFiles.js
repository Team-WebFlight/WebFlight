'use strict'

const fs = require('fs')
const path = require('path')
const commentingEJS = require('./commentingEJS')

/**
 * @param {array} filesArray - array of files from route options
 */
function stringifyFiles (filesArray) {
  if (filesArray.constructor !== Array) var filesArray = [filesArray];

  //console.log('😇FilesArrays',filesArray);
  // So here is where we do a little detour and take care of files that are ejs before they go into Cheerio- commentingEJS is commenting out the snowcones
  return filesArray.map((file) => {
    if (path.extname(file)=== '.ejs'){
      const stringFile = fs.readFileSync(file, 'utf8')
      //console.log('this???👻',commentingEJS(stringFile));
      return commentingEJS(stringFile)
    }else{
      return fs.readFileSync(file, 'utf8')
    }
  })
  //console.log('WHAT IS THIS NOWWWW', changes);
  //return changes;
}

module.exports = stringifyFiles
