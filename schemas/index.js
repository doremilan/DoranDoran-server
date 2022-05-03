const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB_NAME;

const connect = () => {
  mongoose.connect(DB, { ignoreUndefined: true }).catch((err) => {
    console.error(err);
  });
};

<<<<<<< HEAD
module.exports = connect;
=======
module.exports = connect;
>>>>>>> 103e8eb1956ec6204e8c2c1a741b9f68e218d995
