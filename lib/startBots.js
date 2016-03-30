// var Xvfb = require('xvfb')
// var xvfb = new Xvfb()
// xvfb.startSync()

const spawn = require('electron-spawn')

function startBots (seedScript) {
  console.log('starting bot 🤖')
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
    // ends xvfb process if bots stop

    // if (data.includes('going offline')) xvfb.stopSync()
    console.log(data.toString())
  })
}

module.exports = startBots
