const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const {
  getUser,
  getProfile,
  editProfile,
  editTodayMood,
} = require("../controllers/userController");

//테스트 위해서 authMiddleware 제거

router.get("/me", authMiddleware, getUser);

//프로필 조회 API
router.get("/myprofile", authMiddleware, getProfile);

//프로필 수정 API
router.put("/myprofile", authMiddleware, editProfile);

//오늘의 기분 수정 API
router.put("/myprofile/todaymood", authMiddleware, editTodayMood);

module.exports = router;
