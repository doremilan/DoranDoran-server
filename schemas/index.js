const mongoose = require("mongoose");
const config = require("../config");

const connect = () => {
  mongoose.connect(config.db.DB_URL, { ignoreUndefined: true }).catch((err) => {
    console.error(err);
  });
};

module.exports = connect;
