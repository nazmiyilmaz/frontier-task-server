// load env variables
require('dotenv').config({ path: './config/.env' })

// import setup functions
const express = require('express')
const { setCORS, connectDB } = require('./config/setup')

async function start() {
   // connect to db
   await connectDB()

   // init app
   const app = express()

   // set CORS
   setCORS(app)

   // set express options
   app.use(express.urlencoded({ extended: true }))
   app.use(express.json())

   // register routers
   app.use('/api/v1/auth', require('./routes/v1/auth'))
   app.use('/api/v1/products', require('./routes/v1/products'))

   // use custom error handler
   app.use(require('./middlewares/error'))

   // get port
   const port = process.env.DEFAULT_PORT || process.env.PORT

   // start app
   app.listen(port, () => {
      console.log('Default API is listening on port', port)
   })
}

start()
