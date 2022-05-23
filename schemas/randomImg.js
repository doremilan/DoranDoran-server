const mongoose = require("mongoose");

const randomImgSchema = mongoose.Schema({
  randomImg: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

randomImgSchema.virtual("randomImgId").get(function () {
  return this._id.toHexString();
});

randomImgSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("RandomImg", randomImgSchema);
