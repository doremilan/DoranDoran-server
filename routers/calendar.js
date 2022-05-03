const express = require("express");
const router = express.Router();
const Middleware = require("../middlewares/authMiddleware");

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
} = require("../controllers/eventController");

//일정보기 API
router.get("/calendar/:familyId/eventcalendar/:date", getEvent);

//추억보기 API
router.get("/calendar/:familyId/photocalendar/:date");

//추억 상세보기 API
router.get("/calendar/:familyId/photocalendar/detail/:date");

//일정 작성 API
router.get("/calendar/:familyId", createEvent);

//일정 수정 API
router.get("/calendar/:eventId", updateEvent);

//일정 삭제 API
router.get("/calendar/:eventId", deleteEvent);

module.exports = router;
