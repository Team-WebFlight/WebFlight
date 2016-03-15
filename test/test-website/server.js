const express = require('express')
const app = express()

const path = require('path')
const WebFlight = require('../..')

const wfObj = {
  originalHtml: path.join(__dirname, 'index.html'),
  filesFolder: path.join(__dirname, 'img'),
  filesRoute: 'img/',
  jsOutputDL: path.join(__dirname, 'webflight.js'),
  jsOutputUL: path.join(__dirname, 'wf/seedUL.js'),
  htmlOutput: path.join(__dirname, 'wf/index.html'),
  route: '/'
}

WebFlight.start(wfObj)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/img/*', (req, res) => {
  res.sendFile(__dirname + req.url)
})

app.get('/birdVid.ogv', (req, res) => {
  res.sendFile(__dirname + '/videos/birdVid.ogv')
})

app.get('/wf', (req, res) => {
  res.sendFile(__dirname + '/wf/index.html')
})

app.get('/webflight.js', (req, res) => {
  res.sendFile(__dirname + '/webflight.js')
})



app.listen(3000)
