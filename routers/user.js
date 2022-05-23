const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const {
  getUser,
  getProfile,
  editProfile,
  editTodayMood,
} = require("../controllers/userController");

// 유저 정보 조회
router.get("/me", authMiddleware, getUser);

// 프로필 조회
router.get("/myprofile", authMiddleware, getProfile);

// 프로필 수정
router.put(
  "/myprofile",
  upload.single("photoFile"),
  authMiddleware,
  editProfile
);

// 오늘의 기분 수정
router.put("/myprofile/todaymood", authMiddleware, editTodayMood);

module.exports = router;
