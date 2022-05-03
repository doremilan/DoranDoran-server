const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  todayMood: {
    type: String,
  },
});

userSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});
//몽고 db의 고유 아이디 값인 _id를 해당 특정 변수명으로 바꿔주는 코드

module.exports = mongoose.model("User", userSchema);
