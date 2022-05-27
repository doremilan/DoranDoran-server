const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getPhotoEvent,
  getPhotoEventDetail,
  getEventDetail,
} = require("../controllers/eventController");

//일정보기 API
router.get("/:familyId/eventcalendar/:date", authMiddleware, getEvent);

//추억보기 API
router.get("/:familyId/photocalendar/:date", authMiddleware, getPhotoEvent);

//추억 상세보기 API
router.get(
  "/:familyId/photocalendar/detail/:date",
  authMiddleware,
  getPhotoEventDetail
);

//일정 상세보기 API
router.get(
  "/:familyId/eventcalendar/detail/:eventId/:date",
  authMiddleware,
  getEventDetail
);

//일정 작성 API
router.post("/:familyId", authMiddleware, createEvent);

//일정 수정 API
router.put("/:eventId", authMiddleware, updateEvent);

//일정 삭제 API
router.delete("/:eventId", authMiddleware, deleteEvent);

module.exports = router;
