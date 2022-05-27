const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createVoiceAlbum,
  getVoiceAlbum,
  updateVoiceAlbum,
  deleteVoiceAlbum,
} = require("../controllers/voiceAlbumController");

// 보이스 앨범조회
router.get("/:familyId", authMiddleware, getVoiceAlbum);

// 보이스 앨범추가
router.post("/:familyId", authMiddleware, createVoiceAlbum);

// 보이스 앨범수정
router.put("/:voiceAlbumId", authMiddleware, updateVoiceAlbum);

// 보이스 앨범삭제
router.delete("/:voiceAlbumId", authMiddleware, deleteVoiceAlbum);

module.exports = router;
