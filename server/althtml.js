module.exports = althtml;

function althtml(req,res){
  if (req.url === "/somepath"){
    //file path to be decided when we create newDir where stringified html will live
    //res.sendFile(__dirname + '/newDir/index.html')
  }
}
