const express = require("express");
const router = express.Router();
const Middleware = require('../middlewares/authMiddleware');
const voiceUpload = require('../middlewares/converter')

const {
    createVoiceAlbum,
    getVoiceAlbum,
    updateVoiceAlbum,
    deleteVoiceAlbum,
    createVoiceFile,
    getVoiceFile,
    deleteVoiceFile,
} = require('../controllers/voiceController')


//앨범 조회 API
router.get('/voice/:familyId', Middleware, getVoiceAlbum)

//앨범 추가 APi
router.post('/voice/familyId', Middleware, createVoiceAlbum)

//앨범 수정 API
router.put('/voice/voiceAlbumId', Middleware, updateVoiceAlbum)

//앨범 삭제 API
router.delete('/voice/voiceAlbumId', Middleware, deleteVoiceAlbum)


//음성메세지 조회 API
router.get('/voice/:voiceAlbumId', Middleware, createVoiceFile)

//음성메세지 생성 API
router.get('/voice/:voiceAlbumId', Middleware, getVoiceFile)

//음성메세지 삭제 API
router.get('/voice/:voiceFileId', Middleware, deleteVoiceFile)







module.exports = router;
