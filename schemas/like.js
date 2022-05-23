const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  photoId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  familyId: {
    type: String,
    required: true,
  },
  photoAlbumId: {
    type: String,
    required: true,
  },
});

likeSchema.virtual("likeId").get(function () {
  return this._id.toHexString();
});

likeSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Like", likeSchema);
