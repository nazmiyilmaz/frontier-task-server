const AuthService = require('../services/AuthService')

const asyncHandler = require('../middlewares/async')

// LOGIN
module.exports.login = asyncHandler(async (req, res, next) => {
   const { username, password } = req.body
   const result = await AuthService.login(username, password)
   res.status(200).json({ success: true, data: result })
})

// SIGN UP
module.exports.signUp = asyncHandler(async (req, res, next) => {
   const user = await AuthService.signup(req.body)
   res.status(200).json({ success: true, data: user })
})
