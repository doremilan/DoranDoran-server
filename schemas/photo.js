const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  photoName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photoFile: {
    type: String,
    required: true,
  },
  photoAlbumId: {
    type: String,
    required: true,
  },
  totalLike: {
    type: String,
  },
  familyId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.virtual("photoId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Photo", photoSchema);
