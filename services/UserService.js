const User = require('../models/User')

const SecurityService = require('./SecurityService')

// CREATE USER
// creates user with given fields
module.exports.createUser = async (props) => {
   // extract fields from the props
   const { lastName, firstName, password, username, pp = null } = props

   // generate hash from the password
   const hash = await SecurityService.generateHash(password)

   // create user
   const user = new User({ firstName, lastName, username, password: hash, pp })

   // save user
   const saved = await user.save()
   saved.password = undefined
   return saved
}

// GET USER
// get user with given id
module.exports.getUser = async (userId) => {
   const user = await User.findById(userId)
   return user
}

// GET USER BY USERNAME
// Following function brings user with the given username, if this
// username given as an email then it looks for emails
module.exports.getUserByUserName = async (
   username,
   includePassword = false
) => {
   // check emails and usernames for a match
   const query = User.findOne({ username: username })

   // select password if it's wanted
   if (includePassword) query.select('+password')

   const user = await query

   return user
}
