const spawn = require('electron-spawn')
const fs = require('fs')

function botGenerator (seedScript) {
  console.log('starting bot 🤖')
  console.log(fs.readFileSync(seedScript))
  const electron = spawn(seedScript, {
    detached: true
  })
  /**
  * Because of a known bug in chromium, the following code prints a wall of errors.
  * This should be uncommented when the issue is resolved. See here for details:
  *   https://bugs.chromium.org/p/chromium/issues/detail?id=579430
  * electron.stderr.on('data', function (data) {
  *  console.error('error', data.toString())
  * })
  */

  electron.stderr.on('data', function (data) {
    console.error('error', data.toString())
  })
  electron.stdout.on('data', function (data) {
    console.log(data.toString())
  })
}

module.exports = botGenerator
