const path = require('path')
const chokidar = require('chokidar')

chokidar.watch(path.join(__dirname, '../contents')).on('change', val => {
  console.log(val)
})
