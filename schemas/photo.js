const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  photoFile: {
    type: String,
  },
  photoAlbumId: {
    type: String,
    required: true,
  },
  totalLike: {
    type: Number,
    default: 0,
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
    type: String,
    required: true,
  },
  userInfo: {
    type: Object,
  },
});

photoSchema.virtual("photoId").get(function () {
  return this._id.toHexString();
});

photoSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Photo", photoSchema);
