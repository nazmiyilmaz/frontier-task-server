const multer = require('multer')

// normal
// size = size limit in mb
module.exports = ({ size = 1, allowMultiple = false, maxFiles = 20 }) => {
   if (!allowMultiple) {
      return multer({
         storage: multer.memoryStorage(),
         limits: {
            fileSize: size * 1000000, // default 1 mb
         },
      }).single('file')
   } else {
      return multer({
         storage: multer.memoryStorage(),
         limits: {
            fileSize: size * 1000000, // default 1 mb
         },
      }).array('files', maxFiles)
   }
}
