const mongoose = require('mongoose')

const schema = new mongoose.Schema(
   {
      username: {
         type: String,
         unique: true,
         required: true,
         trim: true,
         minlength: 5,
      },
      firstName: {
         type: String,
         required: true,
         trim: true,
      },
      lastName: {
         type: String,
         required: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
      pp: { type: String },
   },
   { timestamps: true }
)

module.exports = mongoose.model('User', schema)
