const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const {
  createFamily,
  createFamilyMember,
  searchUser,
  getfamilyMember,
  editFamilyTitle,
  editFamilyMember,
  deleteFamily,
  deleteFamilyMember,
} = require('../controllers/familyController');

//가족 생성 API
router.post('/', authMiddleware, createFamily);

//가족 구성원 생성 api
router.post('/:familyId', authMiddleware, createFamilyMember);

//멤버 검색 API
router.get('/search', authMiddleware, searchUser);

//가족구성원 조회 API
router.get('/:familyId/familyMember', authMiddleware, getfamilyMember);

//가족 이름 수정  API
router.put('/:familyId', authMiddleware, editFamilyTitle);

//가족 구성원 수정 API
router.put('/:familyId/:familyMemberId', authMiddleware, editFamilyMember);

//가족 삭제 API
router.delete('/:familyId', authMiddleware, deleteFamily);

//가족 구성원 삭제 API
router.delete(
  '/familyMember/:familyMemberId/',
  authMiddleware,
  deleteFamilyMember
);

module.exports = router;
