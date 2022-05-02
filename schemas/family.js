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

familySchema.virtual("familyId").get(function () {
  return this._id.toHexString();
});

familySchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Family", familySchema);
