const express = require("express");
const router = express.Router();
// const Middleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload')
// const voiceUpload = upload.single('voiceFile')
// const { voiceFile } = require('../controllers/voiceController')

const {
    createVoiceFile,
    getVoiceFile,
    deleteVoiceFile,
} = require('../controllers/voiceFileController')



//음성메세지 생성 API
router.post('/:familyId/:voiceAlbumId', upload.single("voiceFile"), createVoiceFile)

//음성메세지 조회 API
router.get('/:voiceAlbumId', getVoiceFile)

//음성메세지 삭제 API
router.delete('/:voiceFileId', deleteVoiceFile)



module.exports = router;
