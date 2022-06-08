const { validationResult } = require('express-validator')
const ErrorResponse = require('../utils/ErrorResponse')

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let message = errors.errors[0].msg
    let statusCode = 400
    throw new ErrorResponse(message, statusCode)
  }
  next()
}
