const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const mainRouter = require("./main");
const familyRouter = require("./family");
const galleryRouter = require("./gallery");
const commentRouter = require("./comment");
const likeRouter = require("./like");
const voiceRouter = require("./voice");
const calendarRouter = require("./calendar");
const missionRouter = require("./mission");
const badgeRouter = require("./badge");
const voiceFileRouter = require('./voiceFile')


router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/main", mainRouter);
router.use("/family", familyRouter);
router.use("/gallery", galleryRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/voice", voiceRouter);
router.use("/calendar", calendarRouter);
router.use("/mission", missionRouter);
router.use("/badge", badgeRouter);
router.use("/voiceFile", voiceFileRouter);

module.exports = router;

