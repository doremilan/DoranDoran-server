const express = require('express');
const router = express.Router();
// const Middleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
// const voiceUpload = upload.single('voiceFile')
// const { voiceFile } = require('../controllers/voiceController')

const {
  createVoiceAlbum,
  getVoiceAlbum,
  updateVoiceAlbum,
  deleteVoiceAlbum,
} = require('../controllers/voiceAlbumController');

//앨범 조회 API
router.get('/:familyId', getVoiceAlbum);

//앨범 추가 APi
router.post('/:familyId', createVoiceAlbum);

//앨범 수정 API
router.put('/:voiceAlbumId', updateVoiceAlbum);

//앨범 삭제 API
router.delete('/:voiceAlbumId', deleteVoiceAlbum);

module.exports = router;
