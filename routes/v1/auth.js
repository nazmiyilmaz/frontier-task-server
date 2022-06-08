const express = require('express')

const router = express.Router()

const { protect } = require('../../middlewares/auth')
const { login, signUp, getMe } = require('../../controllers/auth')

// LOGIN
router.post('/login', login)

// SIGN UP
router.post('/signup', signUp)

// GET ME
router.get('/me', protect, getMe)

module.exports = router
