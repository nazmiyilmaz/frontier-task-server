const User = require('../models/User')

const UserService = require('./UserService')
const SecurityService = require('./SecurityService')

const ErrorResponse = require('../utils/ErrorResponse')

// LOGIN
// login is done by username
module.exports.login = async (username, password) => {
   // get user with this username or email
   const user = await UserService.getUserByUserName(username, true)

   // if there is no user then throw error
   if (!user) {
      throw new ErrorResponse('username or password is incorrect', 400)
   }

   // check password match
   await SecurityService.comparePasswords(password, user.password)

   // payload for the jwt token
   const payload = { username: user.username, userId: user._id }

   //produce jwt token to send a response
   const token = SecurityService.signJWT(payload)

   // return auth data as response
   return {
      token: token,
      id: user._id,
      username: user?.username,
   }
}

// SIGN UP
// signup requires folowing fields; firstName, lastName, email,
// username, password
module.exports.signup = async (props) => {
   // extract fields from the props
   const { firstName, lastName, password, username, pp } = props

   // check for username if it's taken
   let usernameTaken = await UserService.getUserByUserName(username)

   // throw error if the username is taken
   if (usernameTaken) throw new ErrorResponse('username is taken', 400)

   // create the user
   const user = await UserService.createUser({
      firstName,
      lastName,
      username,
      password,
      pp,
   })

   user.password = undefined
   return user
}

// GET AUTHENTICATED USER
module.exports.getAuthenticatedUser = async (userId) => {
   // selected fields
   const fields = ['username', 'firstName', 'lastName']
   // get user
   const user = await User.findById(userId).select(fields).lean()
   // check user
   if (!user) throw new ErrorResponse('user not found', 404)
   //
   return user
}
