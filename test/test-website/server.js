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
  route: '/',
  redirectTo: '/wf/'
}

const wf = new WebFlight(wfObj)

wf.start()

app.use(wf.redirect.bind(wf))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/img/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.url))
})

app.get('/birdVid.ogv', (req, res) => {
  res.sendFile(path.join(__dirname, '/videos/birdVid.ogv'))
})

app.get('/wf', (req, res) => {
  res.sendFile(path.join(__dirname, '/wf/index.html'))
})

app.get('/webflight.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/webflight.js'))
})

app.listen(3000)
