
function commentingEJS (file) {
  return file.replace(/<%([\w\W]*?)%>/g, function (match, subMatch) { return '<!-- <%' + subMatch + '%> -->' })
}
module.exports = commentingEJS
