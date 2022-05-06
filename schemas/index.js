const mongoose = require('mongoose');
require('dotenv').config();

const connect = () => {
  mongoose
    .connect(process.env.DB_NAME, { ignoreUndefined: true })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connect;
