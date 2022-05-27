const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signup,
  login,
  kakaoCallback,
} = require("../controllers/authController");

// 회원가입
router.post("/signup", signup);

// 로그인
router.post("/login", login);

// 카카오 로그인
router.get("/kakao", kakaoCallback);
router.get("/kakao/callback", passport.authenticate("kakao"));

module.exports = router;
