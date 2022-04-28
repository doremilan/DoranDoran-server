const mongoose = require("mongoose");

const missionChkSchema = mongoose.Schema({
  missionId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  familyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MissionChk", missionChkSchema);
