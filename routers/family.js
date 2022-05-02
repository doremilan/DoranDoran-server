const express = require("express");
const router = express.Router();
const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../schemas/user");

//가족 생성 API
router.post('/family', authMiddleware, createFamily)

//가족 구성원 생성 api
router.post('/family/:familyId', authMiddleware, createFamilyMember)

//멤버 이메일 검색 API
router.get('family/search/keyword?keyword="email"', authMiddleware, familyMemberCheckmodal)

//가족구성원 조회 API
router.get('/family/:familyId/familymember', authMiddleware, GetfamilyMember)

//가족 이름 수정  API
router.put('/family/:familyId', authMiddleware, editFamily)

//가족 구성원 수정 API
router.put('/:familyId/:familyMemberId', authMiddleware, editFamilyMember)


module.exports = router;
