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
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PhotoAlbum", photoAlbumSchema);
