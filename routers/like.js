const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { postLike } = require("../controllers/likeController");

// 좋아요
router.post("/:familyId/:photoId", authMiddleware, postLike);

module.exports = router;
