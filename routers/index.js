const express = require("express");

const router = express.Router();

const usersRouter = require("./user");
const familyRouter = require("./family");
const photoRouter = require("./photo");
const commentRouter = require("./comment");
const likeRouter = require("./like");
const voiceRouter = require("./voice");
const eventRouter = require("./event");
const missionRouter = require("./mission");
const badgeRouter = require("./badge");

router.use("/user", usersRouter);
router.use("/family", familyRouter);
router.use("/photo", photoRouter);
router.use("/voice", voiceRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/event", eventRouter);
router.use("/mission", missionRouter);
router.use("/badge", badgeRouter);
