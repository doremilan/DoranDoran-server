const express = require('express');
const router = express.Router();

const {
  postRandomMsg,
  deleteRandomMsg,
} = require('../controllers/randomMsgController');

// 랜덤메시지 생성(내부용)
router.post('/', postRandomMsg);

// 랜덤메시지 삭제(내부용)
router.delete('/:randomMsgId', deleteRandomMsg);

module.exports = router;
