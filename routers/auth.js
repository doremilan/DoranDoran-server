const express = require("express");
const router = express.Router();
const { } = require('../controllers/event')



//일정보기 
router.get('/api/family/:familyId/eventcalendar/:date')

//추억보기 
router.get('/api/family/:familyId/photocalendar/:date')

//추억상세보기 
router.get('/api/family/:familyId/photocalendar/detail/:date')

//일정 작성
router.post('/api/family/:familyId/calendar')

//일정 수정
router.put('/api/family/:familyId/calendar/:eventId')

//일정 삭제
router.delete('/api/family/:familyId/calendar/:eventId')

module.exports = router;
