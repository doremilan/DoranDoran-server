const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getMission,
  getDashboard,
  getPastMission,
  postMission,
  completeMission,
  getfamilyMemberList,
  deleteMission,
} = require("../controllers/missionController");

// 미션 등록
router.post("/:familyId", authMiddleware, postMission);

// 미션 완료 체크
router.post("/:familyId/:missionId", authMiddleware, completeMission);

// 이번달 미션 대시보드 조회
router.get("/dashboard/:familyId", authMiddleware, getDashboard);

// 이번달 미션 목록조회
router.get("/:familyId", authMiddleware, getMission);

// 지난 미션 목록조회
router.get("/:familyId/pastmission", authMiddleware, getPastMission);

// 미션 멤버 목록조회(멤버추가 시 사용)
router.get("/:familyId/familymember", authMiddleware, getfamilyMemberList);

// 미션삭제
router.delete("/:missionId", authMiddleware, deleteMission);

module.exports = router;
