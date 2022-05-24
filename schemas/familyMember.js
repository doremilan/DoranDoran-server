const mongoose = require("mongoose");

const familyMemberSchema = mongoose.Schema({
  familyId: {
    type: String,
    required: true,
  },
  familyMemberNickname: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  todayMood: {
    type: String,
  },
  email: {
    type: String,
  },
});

familyMemberSchema.virtual("familyMemberId").get(function () {
  return this._id.toHexString();
});

familyMemberSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
