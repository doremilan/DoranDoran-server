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

<<<<<<< HEAD
voiceSchema.virtual("voiceFileId").get(function () {
  return this._id.toHexString();
});

voiceSchema.set("toJSON", {
=======
voiceFileSchema.virtual("voiceFileId").get(function () {
  return this._id.toHexString();
});

voiceFileSchema.set("toJSON", {
>>>>>>> 103e8eb1956ec6204e8c2c1a741b9f68e218d995
  virtuals: true,
});

module.exports = mongoose.model("voiceFile", voiceFileSchema);
