const ResourceService = require('../services/ResourceService')

const asyncHandler = require('../middlewares/async')

// UPLOAD FILE
module.exports.uploadFile = asyncHandler(async (req, res, next) => {
   const buffer = req.file.buffer
   const extension = req.file.originalname.split('.').pop()
   const id = ResourceService.upload(buffer, extension)
   res.status(200).json({ success: true, data: id })
})
