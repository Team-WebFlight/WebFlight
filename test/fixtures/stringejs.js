// const simpleejs = require('./simple.ejs')
const fs = require('fs')
const string = fs.readFileSync('./simple.ejs', 'utf8')
module.exports = string
