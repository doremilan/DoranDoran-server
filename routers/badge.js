const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");

const { getBadge } = require('../controllers/badgeController');

// 배지조회
router.get('/:familyId', getBadge);

module.exports = router;
