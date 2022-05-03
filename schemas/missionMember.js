const mongoose = require("mongoose");

const missionMemberSchema = mongoose.Schema({
  missionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  MemberId: {
    type: String,
    required: true,
  },
});

missionMemberSchema.virtual("missionMemberId").get(function () {
  return this._id.toHexString();
});

missionMemberSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("MissionMember", missionMemberSchema);
