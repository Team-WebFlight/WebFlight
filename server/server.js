'use strict'

const express = require('express')
const botGenerator = require('botGenerator.js')
const app = express()
const althtml = require('./althtml.js')

let count = 0

// Middleware func incrementing counter and injecting count into the request header
app.use((req, res, next) => {
  count++
  console.log('Number of requests made: ', count)
  req.headers.count = count
  next()
})

// Middleware func that starts electron-spawn at a specified count
app.use(botGenerator())

//func to send client stringified version of html
app.get('/somepath', function(req,res){
  console.log('req.url',req.url)
  althtml(req,res);
})
app.listen(3000, () => {
  console.log('listening on 3000')
})
