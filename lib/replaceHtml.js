'use strict'

const path = require('path')
const cheerio = require('cheerio')

function replaceHtml (htmlStringsArray, htmlFilesArray, filesObj) {
  const videoExtsArray = [ '.mp4', '.m4v', '.webm' ]
  const allExtsArray = ['.mp4', '.m4v', '.webm', '.m4a', '.mp3', '.wav', '.aac', '.ogg', '.oga', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.css', '.html', '.js', '.md', '.pdf', '.txt']
  //console.log('htmlStringsArray💆', htmlStringsArray);
  //It's not the filesObj that is being passed in, it's the hashObj
  //console.log('filesObj🤕', filesObj);
  const filesArray = Object.keys(filesObj)

///////////////////////
////MAP FUNCTION
//////////////////////
  const htmlStrings = htmlStringsArray.map((htmlString, index) => {
    //console.log('htmlStringRightBeforeCheerio💅', htmlString);
  let commentOutEjs = htmlString.replace(/<%([\w\W]*?)%>/g, function(match, subMatch) {return "<!-- <%"+subMatch+"%> -->" });
    //console.log('commentOutEjs', commentOutEjs)
    const $ = cheerio.load(commentOutEjs)

    //console.log('htmlStringsArrayInBETWEEN💆', htmlString);
    let dlScript = '<script> \nvar client = new WebTorrent();\n'

    filesArray.forEach(replaceSrc)



/////////////////////////////////
////////REPLACESRC FUNCTION TO REPLACE SRC TAGS WITH DIV/CLASS/HASH AND COMPILE CLIENT.ADD STRING
///////////////////////////////
    function replaceSrc (file) {
      //console.log('file😦', file)
      //no video media files
      if (allExtsArray.indexOf(path.extname(file)) < 0) return

      //if one of the media files is a video
      if (videoExtsArray.indexOf(path.extname(file)) > -1) {
        let $elemArray = $(`[src="${file}"]`)
        //console.log('$elemArray😩', $elemArray)
        $elemArray.each((index, elem) => {
          //console.log('😎index', index, 'elem', elem)
          const $div = $('<div></div>')

          $(elem).replaceWith($div)
          $($div).addClass(filesObj[file].hash)
          dlScript += `
      client.add('${filesObj[file].magnet}', function(torrent) {
        var file = torrent.files[0];
        var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));
        if (elementsArray.length) {
          elementsArray.forEach(function(element) {
            file.getBlobURL(function(err, url) {
              $(element).replaceWith($("<video autoplay src='" + url + "' controls></video>"))
            })
          });
        }
      });`
        })

        $elemArray = $(`[src='${file}']`)

        $elemArray.each((index, elem) => {
          $(elem).removeAttr('src')
          $(elem).addClass(filesObj[file].hash)
          dlScript += `
      client.add('${filesObj[file].magnet}', function(torrent) {
        var file = torrent.files[0];
        var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));
        if (elementsArray.length) {
          elementsArray.forEach(function(element) {
            file.getBlobURL(function(err, url) {
              $(element).replaceWith($("<video autoplay src='" + url + "' controls></video>"))
            })
          });
        }
      });`
        })
      }

      let $elemArray = $(`[src="${file}"]`)
      $elemArray.each((index, elem) => {
        $(elem).removeAttr('src')
        $(elem).addClass(filesObj[file].hash)
        dlScript += `
    client.add('${filesObj[file].magnet}', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));
      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });`
      })

      $elemArray = $(`[src='${file}']`)

      $elemArray.each((index, elem) => {
        $(elem).removeAttr('src')
        $(elem).addClass(filesObj[file].hash)
        dlScript += `
    client.add('${filesObj[file].magnet}', function(torrent) {
      var file = torrent.files[0];
      var elementsArray = [].slice.call(document.getElementsByClassName('${filesObj[file].hash}'));
      if (elementsArray.length) {
        elementsArray.forEach(function(element) {
          file.renderTo(element)
        });
      }
    });`
      })
    }

    dlScript += '</script>'

    $('body').append('<script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>')
    $('body').append('<script src="https://code.jquery.com/jquery-2.2.2.js"></script>')
    $('body').append(dlScript)

    return $.html().replace(/<!-- <%([\w\W]*?)%> -->/g, function(match, subMatch) {return "<%"+subMatch+"%>" });
  })
//////////////////////////////////
////////END OF MAP FUNCTION
///////////////////////////////////

  //console.log('💆htmlStringsAfter💆', htmlStrings)
  //console.log('💆htmlStringsAfters💆', htmlStringsArray[0])

  return [htmlStrings, filesObj] // Resolved filesObj to have it in next function
}

module.exports = replaceHtml
