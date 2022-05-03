const mongoose = require('mongoose');

const missionMemberSchema = mongoose.Schema({
  missionId: {
    type: String,
    required: true,
  },
  familyMemberId: {
    type: String,
    required: true,
  },
  missionMemberList: {
    type: Array,
    required: true,
  },
});

missionMemberSchema.virtual('missionMemberId').get(function () {
  return this._id.toHexString();
});

missionMemberSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('MissionMember', missionMemberSchema);
