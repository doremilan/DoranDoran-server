const express = require('express');
const router = express.Router();

const {
  postLandomMsg,
  deleteLandomMsg,
} = require('../controllers/randomMsgController');

// 랜덤메시지 생성(내부용)
router.post('/', postLandomMsg);

// 랜덤메시지 삭제(내부용)
router.delete('/:randomMsgId', deleteLandomMsg);

module.exports = router;
