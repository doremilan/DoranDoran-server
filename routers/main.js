const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { getMainPage, getConnected } = require("../controllers/mainController");

// 메인화면 조회
router.get("/:familyId", authMiddleware, getMainPage);

// 유저 접속상태 조회
router.get("/:familyId/connect", authMiddleware, getConnected);

module.exports = router;
