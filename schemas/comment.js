const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  photoId: {
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
  photoAlbumId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userInfo: {
    type: Object,
  },
});

commentSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

commentSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Comment", commentSchema);
