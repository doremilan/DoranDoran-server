const mongoose = require("mongoose");

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
  dueDate: {
    type: Date,
    required: true,
  },
});

userSchema.virtual("missionId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Mission", missionSchema);
