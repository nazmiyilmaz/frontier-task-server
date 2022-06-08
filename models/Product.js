const mongoose = require('mongoose')

const schema = new mongoose.Schema(
   {
      title: {
         type: String,
      },
      description: {
         type: String,
      },
      image: {
         type: String,
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
   },
   { timestamps: true }
)

module.exports = mongoose.model('Product', schema)
