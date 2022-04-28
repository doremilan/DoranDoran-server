const mongoose = require("mongoose");

const badgeSchema = mongoose.Schema({
  familyId: {
    type: String,
    required: true,
  },
  badge: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Badge", badgeSchema);
