
const request = require('request')
const fs = require('fs')

const domain = 'http://viewers-guide.hbo.com/'
let [z, y, x] = [0, 0, 0]
let pathes = []

for (z = 8; z < 9; z++) {
	for (y = 0; y < 100; y++) {
  	for (x = 0; x < 100; x++) {
    	if (z === 6 && (y > 5 || x > 7)) continue
      if (z === 7 && (y > 13 || x > 21)) continue
      if (z === 8 && (y > 25 || x > 39)) continue

      const filename = `mapimages/${z}/y${y}x${x}.png`
      const path = `${domain + filename}`
      pathes.push({ path, filename })
    }
  }
}

let counter = 0
let next = () => {
  const { path, filename } = pathes[counter]

  request(path).pipe(fs.createWriteStream(filename)).on('close', () => {
    console.log(`> done "${counter}" ${filename}`)

    if (++counter < pathes.length) {
      next()
    }
  })
}

next()