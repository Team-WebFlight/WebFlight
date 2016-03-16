const spawn = require('electron-spawn')

const electron = spawn('./seed.js', {
      detached: true
    })
    electron.stderr.on('data', function (data) {
      console.error('error', data.toString())
    })
    electron.stdout.on('data', function (data) {
      console.log(data.toString())
    })
