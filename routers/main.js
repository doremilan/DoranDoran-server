const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

const { getMainPage } = require('../controllers/mainController')

// 메인화면 조회
router.get('/:familyId', authMiddleware, getMainPage)

module.exports = router
