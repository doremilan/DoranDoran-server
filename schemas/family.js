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

userSchema.virtual("familyId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Family", familySchema);
