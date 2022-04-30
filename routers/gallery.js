const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleWare");

const {
  postPhotoAlbums,
  getPhotoAlbums,
  patchPhotoAlbums,
  deletePhotoAlbums,
} = require("../controllers/galleryController");

// 갤러리 앨범생성
router.post("/:familyId", authMiddleware, postPhotoAlbums);

// 갤러리 앨범조회
router.get("/:familyId", authMiddleware, getPhotoAlbums);

// 갤러리 앨범수정
router.patch("/:familyId", authMiddleware, patchPhotoAlbums);

// 갤러리 앨범삭제
router.delete("/:familyId", authMiddleware, deletePhotoAlbums);

module.exports = router;
