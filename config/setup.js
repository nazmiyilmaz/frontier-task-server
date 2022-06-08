const cors = require('cors')
const mongoose = require('mongoose')

// START CONNECTION WITH THE DB
module.exports.connectDB = async () => {
   console.log('Connecting to the database...')
   await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
}

// SET CORS
module.exports.setCORS = function (app) {
   app.use(cors())
}
