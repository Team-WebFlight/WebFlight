'use strict'

const cheerio = require('cheerio')
const path = require('path')

function addStatusBar (infoArray) {
  const fileHashArr = Array.from(new Set(Object.keys(infoArray[1]).map((asset) => {
    return infoArray[1][asset].hash
  })))

  return infoArray[0].map((htmlString) => {
    const $ = cheerio.load(htmlString)
    $('body').append(`<div id="webflight-loading-ui" style="position: absolute; top: 0; right: 0;"><div id="webflight-close" style="dispay: block; float: right; background: #931f1f; color: white; font-size: 12px; text-align: center; height: 20px; width: 50px; padding: 10px 0px; cursor: pointer; font-family: sans-serif;"><strong>Close</strong></div><div id="webflight-open-button" style="display: block; float: left; height: 20px; width: 230px; padding: 10px; text-align: center; background: #728BAC; color: white; cursor: pointer; font-family: sans-serif"><strong>WebFlight Status</strong></div><div id="webflight-seed" style="clear:both; max-height: 300px; overflow-y: scroll; width: 270px; background: white; padding: 15px; text-align: left; display: none; font-family: sans-serif;">You are downloading and seeding the following files:</div></div>
  <script>
    $(document).ready(function() {
      $('#webflight-close').click(function() {
        $('#webflight-open-button, #webflight-close, #webflight-seed').hide();
      })
      $('#webflight-open-button').click(function() {
        $('#webflight-seed').slideToggle();
      })
    })
  </script>`)

    // TODO: Refactoring

    let elementArray = []
    let uniqObj = {}

    fileHashArr.forEach((hash) => {
      let element = $(`.${hash}`)
      if (element.length) {
        for (let file in infoArray[1]) {
          if (infoArray[1][file].hash === hash) {
            elementArray.push({file: file, hash: hash})
          }
        }
      }
    })

    elementArray.forEach((item) => {
      if (!uniqObj[item.hash]) {
        $('#webflight-seed').append(`<div style="font-family: sans-serif"><br><br><strong>'${path.basename(item.file)}'</strong> at hash: <span style="font-size: 12px; font-weight: bold;"><br>${item.hash}</span></div>`)
        uniqObj[item.hash] = true
      }
    })
    return $.html()
  })
}

module.exports = addStatusBar
