const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
    createFamily,
    createFamilyMember,
    familyMemberCheckmodal,
    getfamilyMember,
    editFamilyTitle,
    editFamilyMember,
    deleteFamily,
    deleteFamilyMember,
} = require("../controllers/familyController");

//가족 생성 API
router.post("/family", authMiddleware, createFamily);

//가족 구성원 생성 api
router.post("/family/:familyId", authMiddleware, createFamilyMember);

//멤버 이메일 검색 API
router.get(
    'family/search/keyword?keyword="email"',
    authMiddleware,
    familyMemberCheckmodal
);

//가족구성원 조회 API
router.get("/family/:familyId/familymember", authMiddleware, getfamilyMember);

//가족 이름 수정  API
router.put("/family/:familyId", authMiddleware, editFamilyTitle);

//가족 구성원 수정 API
router.put("/:familyId/:familyMemberId", authMiddleware, editFamilyMember);

//가족 삭제 API
router.delete("/:familyId", authMiddleware, deleteFamily);

//가족 구성원 삭제 API
router.delete("/:familyMemberId", authMiddleware, deleteFamilyMember);

module.exports = router;
