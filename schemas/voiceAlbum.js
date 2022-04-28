const mongoose = require("mongoose");

const voiceAlbumSchema = mongoose.Schema({
  voiceAlbumName: {
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

module.exports = mongoose.model("voiceAlbum", voiceAlbumSchema);
