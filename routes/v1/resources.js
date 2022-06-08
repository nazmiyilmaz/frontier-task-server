const express = require('express')

const router = express.Router()

const uploader = require('../../middlewares/upload')
const { uploadFile } = require('../../controllers/resources')

// UPLOAD FILE
router.post('/', uploader({ size: 2 }), uploadFile)

module.exports = router
