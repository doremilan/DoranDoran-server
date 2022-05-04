// const express = require("express");
// const router = express.Router();
// const User = require("../schemas/user");
// const jwt = require("jsonwebtoken");
// const fs = require("fs");
// require("dotenv").config();

// const authMiddleware = require("../middlewares/authMiddleware");

// //유저 데이터 get API
// const getUser = async (req, res) => {
//   try {
//     const { userId, nickname, profileImg } = res.locals;
//     res.send({ userId, nickname, profileImg });
//   } catch (error) {
//     console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//     console.log("유저 데이터 GET에서 오류 발생!", error);

//     res
//       .status(400)
//       .send({ errorMessage: "사용자 정보를 가져오지 못하였습니다." });
//     return;
//   }
// };

// //프로필 조회 API
// const getProfile = async (req, res) => {
//   try {
//     const { user } = res.locals;
//     const { userId } = user;
//     const getMyprofile = res
//       .status(200)
//       .send({ nickname, profileImg, todayMood });

//     await getMyprofile;
//   } catch (error) {
//     console.log("프로필 조회에서 오류!", error);
//     res.status(400).send({ result: false });
//   }
// };

// //프로필 수정 API
// const editProfile = async (req, res) => {
//   const { userId } = res.locals;
//   const { nickname, profileImg } = req.body;
//   const EditMyProfile = await User.updateOne(
//     { userId },
//     { $set: { nickname, profileImg } }
//   );

//   if (!nickname || !profileImg) {
//     return res.status(200).send({
//       nickname,
//       profileImg,
//     });
//   } else if (!EditMyProfile) {
//     console.log("프로필 수정에서 오류!", error);
//     res.status(400).send({ result: false });
//   }
// };

// //오늘의 기분 수정 API
// const editTodayMood = async (req, res) => {
//   try {
//     const { userId } = res.locals;
//     const { todayMood } = req.body;
//     await User.updateOne({ userId }, { $set: { todayMood } });

//     res.status(200).send({
//       todayMood,
//     });
//   } catch (error) {
//     console.log("오늘의기분 수정에서 오류!", error);
//     res.status(400).send({ result: false });
//   }
// };

// module.exports = {
//   getUser,
//   getProfile,
//   editProfile,
//   editTodayMood,
// };
