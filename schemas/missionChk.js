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
  familyMemberId: {
    type: String,
    required: true,
  },
  familyId: {
    type: String,
    required: true,
  },
});

missionChkSchema.virtual("missionChkId").get(function () {
  return this._id.toHexString();
});

missionChkSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("MissionChk", missionChkSchema);
