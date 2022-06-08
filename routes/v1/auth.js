const express = require('express')

const router = express.Router()

const { login, signUp } = require('../../controllers/auth')

// LOGIN
router.post('/login', login)

// SIGN UP
router.post('/signup', signUp)

module.exports = router
