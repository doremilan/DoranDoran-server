const mongoose = require('mongoose')

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

console.log(process.env.DB_NAME)

const connect = () => {
  mongoose
    .connect(process.env.DB_NAME, { ignoreUndefined: true })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = connect
