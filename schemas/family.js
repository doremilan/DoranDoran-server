const mongoose = require("mongoose");

const familySchema = mongoose.Schema({
  familyTitle: {
    type: String,
    required: true,
  },
  familyHost: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Family", familySchema);
