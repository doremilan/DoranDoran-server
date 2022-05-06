const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");

// const {
//   getMission,
//   getPastMission,
//   postMission,
//   completeMission,
// } = require("../controllers/missionController");

// // 미션 등록
// router.post("/:familyId", authMiddleware, postMission);

// // 미션 완료 체크
// router.post("/:missionId", authMiddleware, completeMission);

// // 이번주 미션 목록조회
// router.get("/:familyId", authMiddleware, getMission);

// // 지난 미션 목록조회
// router.get("/:familyId/pastmission", authMiddleware, getPastMission);

module.exports = router;
