const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");
// const upload = require('../middlewares/upload')
// const {
//   postPhotoAlbums,
//   getPhotoAlbums,
//   putPhotoAlbums,
//   deletePhotoAlbums,
//   postPhoto,
//   getPhoto,
//   getPhotoDetail,
//   putPhoto,
//   deletePhoto,
// } = require("../controllers/galleryController");

// // 앨범생성
// router.post("/:familyId", authMiddleware, postPhotoAlbums);

// // 앨범조회
// router.get("/:familyId", authMiddleware, getPhotoAlbums);

// // 앨범수정
// router.put("/:familyId", authMiddleware, putPhotoAlbums);

// // 앨범삭제
// router.delete("/:familyId", authMiddleware, deletePhotoAlbums);

// // 사진 목록조회
// router.get("/:photoAlbumId", authMiddleware, getPhoto);

// // 사진 상세조회
// router.get("/:photoId", authMiddleware, getPhotoDetail);

// // 사진수정
// router.put("/:photoId", authMiddleware, putPhoto);

// // 사진삭제
// router.delete("/:photoId", authMiddleware, deletePhoto);

// // 사진생성 (업로드 미들웨어 확인필요)
// router.post(
//   "/:familyId/:photoAlbumId",
//   // upload.single("photoFile"),
//   authMiddleware,
//   postPhoto
// );

module.exports = router;
