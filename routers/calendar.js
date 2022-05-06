const express = require("express");
const router = express.Router();
// const Middleware = require('../middlewares/authMiddleware');

const {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getPhotoEvent,
    getPhotoEventDetail,
    getEventDetail
} = require('../controllers/eventController')


//일정보기 API
router.get('/:familyId/eventcalendar/:date', getEvent)

//추억보기 API
router.get('/:familyId/photocalendar/:date', getPhotoEvent)

//추억 상세보기 API
router.get('/:familyId/photocalendar/detail/:date', getPhotoEventDetail)

//일정 상세보기 API
router.get('/:familyId/eventcalendar/detail/:date', getEventDetail)

//일정 작성 API
router.post('/:familyId', createEvent)

//일정 수정 API
router.put('/:eventId', updateEvent)

//일정 삭제 API
router.delete('/:eventId', deleteEvent)


module.exports = router;
