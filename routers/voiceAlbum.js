const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const {
  createVoiceAlbum,
  getVoiceAlbum,
  updateVoiceAlbum,
  deleteVoiceAlbum,
} = require('../controllers/voiceAlbumController');

//앨범 조회 API
router.get('/:familyId', authMiddleware, getVoiceAlbum);

//앨범 추가 APi
router.post('/:familyId', authMiddleware, createVoiceAlbum);

//앨범 수정 API
router.put('/:voiceAlbumId', authMiddleware, updateVoiceAlbum);

//앨범 삭제 API
router.delete('/:voiceAlbumId', authMiddleware, deleteVoiceAlbum);

module.exports = router;
