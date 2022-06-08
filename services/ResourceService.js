const FileSystemUtils = require('../utils/FileSystemUtils')
const IdGenerator = require('../utils/IdGenerator')

module.exports.upload = async (buffer, extension) => {
   const id = IdGenerator.generate()
   const path = `${process.cwd()}/public/${id}.${extension}`
   await FileSystemUtils.write(path, buffer)
   return id
}
