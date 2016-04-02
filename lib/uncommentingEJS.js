'use strict'

function uncommentingEJS (strings) {
  return strings.map((everyEjsString) => {
    return everyEjsString.replace(/<!-- <%([\w\W]*?)%> -->/g, (match, subMatch) => { return '<%' + subMatch + '%>' })
  })
}

module.exports = uncommentingEJS
