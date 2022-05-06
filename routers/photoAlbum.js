const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleWare");
// const upload = require('../middlewares/upload')
const {
  postPhotoAlbums,
  getPhotoAlbums,
  putPhotoAlbums,
  deletePhotoAlbums,
} = require('../controllers/photoAlbumController');

// 앨범생성
router.post('/:familyId', postPhotoAlbums);

// 앨범조회
router.get('/:familyId', getPhotoAlbums);

// 앨범수정
router.put('/:photoAlbumId', putPhotoAlbums);

// 앨범삭제
router.delete('/:photoAlbumId', deletePhotoAlbums);

module.exports = router;
