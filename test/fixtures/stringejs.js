// const simpleejs = require('./simple.ejs')
const fs = require('fs')
const path = require('path')
const string = fs.readFileSync(path.join(__dirname, './simple.ejs'), 'utf8')
module.exports = string
