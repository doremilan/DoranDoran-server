const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  postPhotoAlbums,
  getPhotoAlbums,
  putPhotoAlbums,
  deletePhotoAlbums,
} = require("../controllers/photoAlbumController");

// 갤러리 앨범생성
router.post("/:familyId", authMiddleware, postPhotoAlbums);

// 갤러리 앨범조회
router.get("/:familyId", authMiddleware, getPhotoAlbums);

// 갤러리 앨범수정
router.put("/:photoAlbumId", authMiddleware, putPhotoAlbums);

// 갤러리 앨범삭제
router.delete("/:photoAlbumId", authMiddleware, deletePhotoAlbums);

module.exports = router;
