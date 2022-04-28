const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  photoId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
