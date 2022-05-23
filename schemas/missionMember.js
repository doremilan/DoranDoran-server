const mongoose = require("mongoose");

const missionMemberSchema = mongoose.Schema({
  missionId: {
    type: String,
    required: true,
  },
  familyMemberId: {
    type: String,
    required: true,
  },
  familyMemberNickname: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  myMissionChk: {
    type: Boolean,
  },
  familyId: {
    type: String,
    required: true,
  },
  userId: {
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

module.exports =
  mongoose.models.MissionMember ||
  mongoose.model("MissionMember", missionMemberSchema);
