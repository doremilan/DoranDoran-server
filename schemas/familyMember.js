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
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
