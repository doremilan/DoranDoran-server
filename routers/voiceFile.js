const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createVoiceFile,
  getVoiceFile,
  deleteVoiceFile,
} = require("../controllers/voiceFileController");

// 음성메세지 생성
router.post(
  "/:familyId/:voiceAlbumId",
  authMiddleware,
  upload.single("voiceFile"),
  createVoiceFile
);

// 음성메세지 조회
router.get("/:voiceAlbumId", authMiddleware, getVoiceFile);

// 음성메세지 삭제
router.delete("/:voiceFileId", authMiddleware, deleteVoiceFile);

module.exports = router;
