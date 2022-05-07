const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' })

const connect = () => {
  mongoose
    .connect(process.env.DB_NAME, { ignoreUndefined: true })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = connect
