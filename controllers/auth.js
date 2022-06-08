const AuthService = require('../services/AuthService')
const UserService = require('../services/UserService')

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

// GET ME
module.exports.getMe = asyncHandler(async (req, res, next) => {
   const user = await UserService.getUser(req.user?._id)
   res.status(200).json({ success: true, data: user })
})
