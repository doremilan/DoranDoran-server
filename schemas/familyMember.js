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
});

userSchema.virtual("familyMemberId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
