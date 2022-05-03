const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");
// const upload = require('../middlewares/upload')
const {
  postPhotoAlbums,
  getPhotoAlbums,
  putPhotoAlbums,
  deletePhotoAlbums,
  postPhoto,
  getPhoto,
  getPhotoDetail,
  putPhoto,
  deletePhoto,
} = require("../controllers/galleryController");

// 앨범생성
router.post("/:familyId", postPhotoAlbums);

// 앨범조회
router.get("/:familyId", getPhotoAlbums);

// 앨범수정
router.put("/:familyId", putPhotoAlbums);

// 앨범삭제
router.delete("/:familyId", deletePhotoAlbums);

// 사진 목록조회
router.get("/:photoAlbumId", getPhoto);

// 사진 상세조회
router.get("/:photoId", getPhotoDetail);

// 사진수정
router.put("/:photoId", putPhoto);

// 사진삭제
router.delete("/:photoId", deletePhoto);

// 사진생성 (업로드 미들웨어 확인필요)
router.post(
  "/:familyId/:photoAlbumId",
  // upload.single("photoFile"),
  // authMiddleware,
  postPhoto
);

module.exports = router;
