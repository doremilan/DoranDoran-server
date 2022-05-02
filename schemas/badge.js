const mongoose = require("mongoose");

const badgeSchema = mongoose.Schema({
  familyId: {
    type: String,
    required: true,
  },
  badge: {
    type: Array,
    required: true,
  },
});

userSchema.virtual("badgeId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Badge", badgeSchema);
