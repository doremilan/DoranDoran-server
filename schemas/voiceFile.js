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
    tpye: String,
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

voiceSchema.virtual("voiceFileId").get(function () {
  return this._id.toHexString();
});

voiceSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("voiceFile", voiceFileSchema);
