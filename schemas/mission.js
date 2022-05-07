const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
  missionTitle: {
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
  createdAt: {
    type: Date,
    required: true,
  },
  missionMemberList: {
    type: Object,
  },
  familyMissionChk: {
    type: Boolean,
  },
});

missionSchema.virtual('missionId').get(function () {
  return this._id.toHexString();
});

missionSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Mission', missionSchema);
