const express = require("express");
const router = express.Router();

const {
  postRandomMsg,
  deleteRandomMsg,
  postRandomImg,
} = require("../controllers/randomMsgController");

// 랜덤메시지 생성(내부용)
router.post("/", postRandomMsg);

// 랜덤메시지 삭제(내부용)
router.delete("/:randomMsgId", deleteRandomMsg);

// 랜덤 프로필이미지 생성(내부용)
router.post("/randomImg", postRandomImg);

module.exports = router;
