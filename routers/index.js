const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
// const mainRouter = require("./main");
const familyRouter = require("./family");
const galleryRouter = require("./gallery");
<<<<<<< HEAD
const commentRouter = require("./comment");
const likeRouter = require("./like");
const missionRouter = require("./mission");
const badgeRouter = require("./badge");
const calendarRouter = require("./calendar");
const voiceRouter = require("./voiceAlbum");
const voiceFileRouter = require('./voiceFile')

=======
// const commentRouter = require("./comment");
// const likeRouter = require("./like");
// const voiceRouter = require("./voice");
// const calendarRouter = require("./calendar");
// const missionRouter = require("./mission");
// const badgeRouter = require("./badge");
>>>>>>> 1c3da5e8318ac143e1f8acc65598c4e460243c0e

router.use("/auth", authRouter);
router.use("/user", userRouter);
// router.use("/main", mainRouter);
router.use("/family", familyRouter);
router.use("/gallery", galleryRouter);
<<<<<<< HEAD
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/mission", missionRouter);
router.use("/badge", badgeRouter);
router.use("/calendar", calendarRouter);
router.use("/voiceAlbum", voiceRouter);
router.use("/voiceFile", voiceFileRouter);
=======
// router.use("/comment", commentRouter);
// router.use("/like", likeRouter);
// router.use("/voice", voiceRouter);
// router.use("/calendar", calendarRouter);
// router.use("/mission", missionRouter);
// router.use("/badge", badgeRouter);
>>>>>>> 1c3da5e8318ac143e1f8acc65598c4e460243c0e

module.exports = router;

