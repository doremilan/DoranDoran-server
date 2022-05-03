const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const {
  getUser,
  signup,
  login,
  getProfile,
  editProfile,
  editTodayMood,
} = require("../controllers/userController");

router.get("/me", authMiddleware, getUser);

//프로필 조회 API
router.get("/myprofile", authMiddleware, getProfile);

//프로필 수정 API
router.put("/myPfofile", authMiddleware, editProfile);

//오늘의 기분 수정 API
router.put("/myPfofile/todaymood", authMiddleware, editTodayMood);

module.exports = router;
