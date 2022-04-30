const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://Milan:dlalfks1**@cluster0.f4f1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { ignoreUndefined: true }
    )
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connect;
module.exports = router;