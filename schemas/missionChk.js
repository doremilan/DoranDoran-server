const mongoose = require("mongoose");

const missionChkSchema = mongoose.Schema({
  missionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  familyId: {
    type: String,
    required: true,
  },
});

userSchema.virtual("missionChkId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("MissionChk", missionChkSchema);
