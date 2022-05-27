const mongoose = require("mongoose");

const photoAlbumSchema = mongoose.Schema({
  photoAlbumName: {
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
  randomPhoto: {
    type: String,
  },
});

photoAlbumSchema.virtual("photoAlbumId").get(function () {
  return this._id.toHexString();
});

photoAlbumSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("PhotoAlbum", photoAlbumSchema);
