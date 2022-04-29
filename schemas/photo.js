const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  photoName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photoFile: {
    type: String,
    required: true,
  },
  photoAlbumId: {
    type: String,
    required: true,
  },
  totalLike: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  // email:{
  //   type:String,
  // }
});

module.exports = mongoose.model("Photo", photoSchema);
