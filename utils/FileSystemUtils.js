const fs = require('fs')

// WRITE BUFFER TO DIRECTORY
module.exports.write = async function (dir, buffer) {
   await fs.promises.writeFile(dir, buffer)
}
