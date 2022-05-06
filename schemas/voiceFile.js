const mongoose = require("mongoose");

const voiceFileSchema = mongoose.Schema({
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
  userId: {
    type: String,
  },
  familyId: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  familyMemberNickname: {
    type: String,
  },
  voicePlayTime: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

voiceFileSchema.virtual("voiceFileId").get(function () {
  return this._id.toHexString();
});

voiceFileSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("VoiceFile", voiceFileSchema);
