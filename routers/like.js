const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");

const { postLike } = require('../controllers/likeController');

// 좋아요
router.post('/:photoId', postLike);

module.exports = router;
