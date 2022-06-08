const ErrorResponse = require('../utils/ErrorResponse')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// GENERATE UNIQUE TOKEN
// generates a unique token for resetting password
module.exports.randomToken = () => {
   const randomBytes = crypto.randomBytes(20).toString('hex')
   const token = crypto.createHash('sha256').update(randomBytes).digest('hex')
   return {
      bytes: randomBytes,
      token: token,
   }
}

// VERIFY TOKEN
// re-produces the token from the random bytes
module.exports.reProduceToken = (bytes) => {
   const token = crypto.createHash('sha256').update(bytes).digest('hex')
   return token
}

// GENERATE EXPIRE
// abstracts the dirty calulations for creating a expiration time for reset token
module.exports.generateExpire = (opts = {}) => {
   const addition =
      (opts.minutes || 0) + (opts.hours || 0) * 60 + (opts.days || 0) * 24 * 60
   const expire = Date.now() + addition * 60 * 1000
   return expire
}

// COMPARE PASSWORDS
// compares the hash to the given password
module.exports.comparePasswords = async (password, hash) => {
   const match = await bcrypt.compare(password, hash)
   if (!match) {
      throw new ErrorResponse('username or password is incorrect', 401)
   }
}

// GENERATE PASSWORD HASH
// hashes the password to insert to the db
module.exports.generateHash = async (password) => {
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password, salt)
   return hash
}

// SIGN JWT TOKEN
// produces JWT token with given payload and options
module.exports.signJWT = (payload, opts) => {
   const secret = process.env.JWT_SECRET
   const token = jwt.sign(payload, secret, opts)
   return token
}

// VERIFY JWT TOKEN
// verifies jwt
module.exports.verifyJWT = (token) => {
   try {
      const secret = process.env.JWT_SECRET
      const decoded = jwt.verify(token, secret)
      return decoded
   } catch (error) {
      throw new ErrorResponse('access token is probably expired', 400)
   }
}
