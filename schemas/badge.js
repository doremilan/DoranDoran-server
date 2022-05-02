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

badgeSchema.virtual("badgeId").get(function () {
  return this._id.toHexString();
});

badgeSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Badge", badgeSchema);
