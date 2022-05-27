const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { getBadge } = require("../controllers/badgeController");

// 배지조회
router.get("/:familyId", authMiddleware, getBadge);

module.exports = router;
