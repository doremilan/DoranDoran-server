const mongoose = require("mongoose");

const randomMsgSchema = mongoose.Schema({
  randomMsg: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

randomMsgSchema.virtual("randomMsgId").get(function () {
  return this._id.toHexString();
});

randomMsgSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("RandomMsg", randomMsgSchema);
