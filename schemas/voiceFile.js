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
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    tpye: String,
  },

  // familyMemberNickname:{
  //   type:String,
  // }
});

module.exports = mongoose.model("voiceFile", voiceFileSchema);
