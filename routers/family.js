const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

//가족 생성 API
router.post('/family', authMiddleware, CreateFamily)

//가족 구성원 생성 api
router.post('/family/:familyId', authMiddleware, CreateFamilyMember)

//멤버 이메일 검색 API
router.get('family/search/keyword?keyword="email"', authMiddleware, FamilyMemberCheckmodal)

//가족구성원 조회 API
router.get('/family/:familyId/familymember', authMiddleware, GetfamilyMember)

//가족 이름 수정  API
router.put('/family/:familyId', authMiddleware, EditFamilyTitle)

//가족 구성원 수정 API
router.put('/:familyId/:familyMemberId', authMiddleware, EditFamilyMember)

//가족 삭제 API
router.delete('/:familyId', authMiddleware, DeleteFamily )

//가족 구성원 삭제 API
router.delete('/:familyMemberId', authMiddleware, DeleteFamilyMember)


module.exports = router;
