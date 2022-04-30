const mongoose = require("mongoose");

const photoAlbumSchema = mongoose.Schema({
  photoAlbumName: {
    type: String,
    required: true,
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

userSchema.virtual("photoAlbumId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("PhotoAlbum", photoAlbumSchema);
