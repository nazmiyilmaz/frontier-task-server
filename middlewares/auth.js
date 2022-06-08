const AuthService = require('../services/AuthService')
const SecurityService = require('../services/SecurityService')

const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('./async')

// PROTECT
exports.protect = asyncHandler(async (req, res, next) => {
   // get header
   const header = req.get('Authorization')

   // if authorization header not found throw error
   if (!header) throw new ErrorResponse('authorization header not found', 401)

   // get token
   const token = header.startsWith('Bearer') ? header.split(' ')[1] : null

   // throw error if no token
   if (!token) throw new ErrorResponse('not authorized for the operation', 401)

   // check token validity
   const decoded = SecurityService.verifyJWT(token)

   // throw error if user is not available
   if (!decoded.userId) throw new ErrorResponse('invalid access token', 400)

   // user
   req.user = await AuthService.getAuthenticatedUser(decoded.userId)

   // continue
   next()
})
