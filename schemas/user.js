const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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
  snsId: {
    type: String,
  },
  provider: {
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
//이 쪽이 문제(멤버 검색 api)
//_id

module.exports = mongoose.model("User", userSchema);
