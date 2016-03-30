const cheerio = require('cheerio')

function createSeedObj (htmlStrings, filesObj) {
  const seedObj = {}

  // each html file gets its own seed based off srcs found on filesObj
  htmlStrings.map((html) => {
    const pathArray = []
    const srcArray = []

    const $ = cheerio.load(html)
    const $src = $('body').find('[src]')

    // load seedArray with files to seed
    $src.each((index, elem) => {
      const src = $(elem).attr('src')
      const path = filesObj[src].path

      if (!filesObj[src]) return
      if (pathArray.indexOf(path) < 0) pathArray.push(path)
      if (srcArray.indexOf(src) < 0) srcArray.push(src)
    })

    return [pathArray, srcArray]
  }).forEach((array, index) => {
    seedObj[index] = {
      paths: array[0],
      srcs: array[1]
    }
  })

  return seedObj
}

module.exports = createSeedObj
