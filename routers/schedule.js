const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const { getMonthEvent } = require('../controllers/node-schedule')


router.get('/:familyId', authMiddleware, getMonthEvent)


module.exports = router;