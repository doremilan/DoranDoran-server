const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");

const { getBadge } = require('../controllers/badgeController');

// 좋아요
router.badge('/:familyId', getBadge);

module.exports = router;
