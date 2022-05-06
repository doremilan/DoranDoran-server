const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
// const jwt = require("jsonwebtoken");
// const fs = require("fs");
// require("dotenv").config();

<<<<<<< HEAD
// const {
//     Getuser,
//     Getprofile,
//     Editprofile,
//     EditTodaymood
// } = require("../controllers/userController");

=======
const {
  getUser,
  getProfile,
  editProfile,
  editTodayMood,
} = require("../controllers/userController");

//테스트 위해서 authMiddleware 제거

router.get("/me", authMiddleware, getUser);
>>>>>>> 1c3da5e8318ac143e1f8acc65598c4e460243c0e


<<<<<<< HEAD
// router.get("/me", authMiddleware, Getuser)

// //유저가 회원가입 요청시 사용하는 API입니다.
// //썬더 클론 - 더미 데이터로 테스트 완료.
=======
//프로필 수정 API
router.put("/myprofile", authMiddleware, editProfile);

//오늘의 기분 수정 API
router.put("/myprofile/todaymood", authMiddleware, editTodayMood);
>>>>>>> 1c3da5e8318ac143e1f8acc65598c4e460243c0e

// //프로필 조회 API
// router.get("/myprofile", authMiddleware, Getprofile)

// //프로필 수정 API
// router.put("/myPfofile", authMiddleware, Editprofile)

// //오늘의 기분 수정 API
// router.put("/myPfofile/todaymood", authMiddleware, EditTodaymood)


module.exports = router;