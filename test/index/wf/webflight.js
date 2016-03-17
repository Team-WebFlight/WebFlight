var client = new WebTorrent()

client.add('6b3de12e40f686573e9fe480a50a70ca38c441df', function (torrent) {
  var file = torrent.files[0]
  var elementsArray = document.getElementsByClassName('.6b3de12e40f686573e9fe480a50a70ca38c441df')

  elementsArray.forEach(function (element) {
    file.renderTo(element)
  })
})

client.add('923ad49f0ca1962716d34bd60433de8a207570f7', function (torrent) {
  var file = torrent.files[0]
  var elementsArray = document.getElementsByClassName('.923ad49f0ca1962716d34bd60433de8a207570f7')

  elementsArray.forEach(function (element) {
    file.renderTo(element)
  })
})
