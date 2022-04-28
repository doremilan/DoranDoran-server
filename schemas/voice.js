const mongoose = require("mongoose");

const voiceSchema = mongoose.Schema({
  voiceTitle: {
    type: String,
    required: true,
  },
  voiceFile: {
    type: String,
    required: true,
  },
  voiceAlbumId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Voice", voiceSchema);
