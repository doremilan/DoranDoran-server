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
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

voiceAlbumSchema.virtual("voiceAlbumId").get(function () {
  return this._id.toHexString();
});

voiceAlbumSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("VoiceAlbum", voiceAlbumSchema);
