const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB_NAME

const connect = () => {
  mongoose
    .connect(
      DB,
      { ignoreUndefined: true }
    )
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connect;
module.exports = router;