const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const mainRouter = require("./main");
const familyRouter = require("./family");
const photoAlbumRouter = require("./photoAlbum");
const photoRouter = require("./photo");
const commentRouter = require("./comment");
const likeRouter = require("./like");
const voiceRouter = require("./voiceAlbum");
const voiceFileRouter = require("./voiceFile");
const calendarRouter = require("./calendar");
const missionRouter = require("./mission");
const badgeRouter = require("./badge");
const randomMsgRouter = require("./randomMsg");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/main", mainRouter);
router.use("/family", familyRouter);
router.use("/photoAlbum", photoAlbumRouter);
router.use("/photo", photoRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/voiceAlbum", voiceRouter);
router.use("/voiceFile", voiceFileRouter);
router.use("/calendar", calendarRouter);
router.use("/mission", missionRouter);
router.use("/badge", badgeRouter);
router.use("/randomMsg", randomMsgRouter);

module.exports = router;
