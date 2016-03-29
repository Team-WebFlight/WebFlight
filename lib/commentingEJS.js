
function commentingEJS (file){
  //return 'this is what you get';
  //console.log('youre in here');
  return file.replace(/<%([\w\W]*?)%>/g, function(match, subMatch) {return "<!-- <%"+subMatch+"%> -->" });
}
module.exports = commentingEJS
