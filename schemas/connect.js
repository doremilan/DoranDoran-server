const mongoose = require("mongoose");

const connectSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  connected: {
    type: Boolean,
  },
  connectedAt: {
    type: String,
  },
  socketId: {
    type: String,
    required: true,
  },
});

connectSchema.virtual("connectId").get(function () {
  return this._id.toHexString();
});

connectSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Connect", connectSchema);
