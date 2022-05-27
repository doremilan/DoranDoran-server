const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  postComment,
  deleteComment,
} = require("../controllers/commentController");

// 댓글생성
router.post("/:familyId/:photoAlbumId/:photoId", authMiddleware, postComment);

// 댓글삭제
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
