const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getFamilyList,
  createFamily,
  createFamilyMember,
  searchUser,
  getfamilyMember,
  editFamilyTitle,
  editFamilyMember,
  deleteFamily,
  deleteFamilyMember,
} = require("../controllers/familyController");

//가족 리스트 조회 API
router.get("/familylist", authMiddleware, getFamilyList);

// 가족생성
router.post("/", authMiddleware, createFamily);

// 가족구성원 추가
router.post("/:familyId", authMiddleware, createFamilyMember);

// 가족구성원 검색
router.get("/search", authMiddleware, searchUser);

// 가족구성원 목록조회
router.get("/:familyId/familyMember", authMiddleware, getfamilyMember);

// 가족이름 수정
router.put("/:familyId", authMiddleware, editFamilyTitle);

// 가족구성원 수정
router.put("/:familyId/:familyMemberId", authMiddleware, editFamilyMember);

// 가족삭제
router.delete("/:familyId", authMiddleware, deleteFamily);

// 가족구성원 삭제
router.delete(
  "/familyMember/:familyMemberId/",
  authMiddleware,
  deleteFamilyMember
);

module.exports = router;
