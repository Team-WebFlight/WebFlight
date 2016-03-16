const spawn = require('electron-spawn')

module.exports = botGenerator

function botGenerator (options) {
  console.log('starting bot 🤖')
  const electron = spawn(options.jsOutputUL, {
    detached: true
  })
  // electron.stderr.on('data', function (data) {
  //   console.error('error', data.toString())
  // })
  electron.stdout.on('data', function (data) {
    console.log(data.toString())
  })
}
