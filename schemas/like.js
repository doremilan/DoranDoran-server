const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  photoId: {
    type: String,
    required: true,
  },
  photoAlbumId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

userSchema.virtual("likeId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Like", likeSchema);
