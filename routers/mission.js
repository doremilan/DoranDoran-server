const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleWare");

const {
  postComment,
  deleteComment,
} = require("../controllers/commentController");

// 이번주 미션 현황 & 목록조회
router.get("/:familyId", authMiddleware, getMission);

// 지난 미션 목록조회
router.get("/:familyId/pastmission", authMiddleware, getPastMission);

// 미션 등록
router.post("/:familyId", authMiddleware, postMission);

// 앨범수정
router.put("/:familyId", authMiddleware, putMission);

// 앨범삭제
router.delete("/:familyId", authMiddleware, deleteMission);

// 사진 목록조회
router.get("/:photoAlbumId", authMiddleware, getMission);

// 사진 상세조회
router.get("/:photoId", authMiddleware, getMission);

module.exports = router;
