const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");

const {
  postComment,
  deleteComment,
} = require('../controllers/commentController');

// 댓글생성
router.post('/:photoAlbumId/:photoId', postComment);

// 댓글삭제
router.delete('/:commentId', deleteComment);

module.exports = router;
