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
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
