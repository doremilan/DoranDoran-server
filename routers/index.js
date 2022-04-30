const express = require("express");

const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const mainRouter = require("./main");
const familyRouter = require("./family");
const galleryRouter = require("./gallery");
const commentRouter = require("./comment");
const likeRouter = require("./like");
<<<<<<< HEAD
const voiceFileRouter = require("./voice");
const eventRouter = require("./event");
=======
const voiceRouter = require("./voice");
const calendarRouter = require("./calendar");
>>>>>>> origin/develop
const missionRouter = require("./mission");
const badgeRouter = require("./badge");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/main", mainRouter);
router.use("/family", familyRouter);
<<<<<<< HEAD
router.use("/photo", photoRouter);
router.use("/voiceFile", voiceFileRouter);
=======
router.use("/gallery", galleryRouter);
>>>>>>> origin/develop
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/voice", voiceRouter);
router.use("/calendar", calendarRouter);
router.use("/mission", missionRouter);
router.use("/badge", badgeRouter);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> origin/develop
