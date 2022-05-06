const express = require('express');
const router = express.Router();

const { getMainPage } = require('../controllers/mainController');

// 메인화면 조회
router.get('/:familyId', getMainPage);

module.exports = router;
