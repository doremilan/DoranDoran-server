const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");

const {
  getMission,
  getPastMission,
  postMission,
  completeMission,
  getfamilyMemberList,
  deleteMission,
} = require('../controllers/missionController');

// 미션 등록
router.post('/:familyId', postMission);

// 미션 완료 체크
router.post('/:familyId/:missionId', completeMission);

// 이번달 미션 대시보드 & 목록조회
router.get('/:familyId', getMission);

// 지난 미션 목록조회
router.get('/:familyId/pastmission', getPastMission);

// 미션 멤버 목록조회(멤버추가 시 사용)
router.get('/:familyId/familymember', getfamilyMemberList);

// 미션삭제
router.delete('/:familyId/:missionId', deleteMission);

module.exports = router;
