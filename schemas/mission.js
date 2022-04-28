const mongoose = require("mongoose");

const missionSchema = mongoose.Schema({
  missionTitle: {
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
  dueDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Mission", missionSchema);
