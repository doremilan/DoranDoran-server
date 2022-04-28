const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  event: {
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
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  color: {
    type: Date,
  },
});

module.exports = mongoose.model("Event", eventSchema);
