const VoiceAlbum = require('../schemas/voiceAlbum')
const VoiceFile = require('../schemas/voiceFile')
const FamilyMember = require('../schemas/familyMember')
const User = require('../schemas/user')


const createVoiceAlbum = async (req, res) => {
    const { familyId } = req.params;
    const { userId } = res.locals;
    const { voiceAlbumName } = req.body;
    const createdAt = new Date();

    try {
        // 공백 체크
        if (voiceAlbumName !== null && voiceAlbumName !== "") {
            const createdvoiceAlbum = await voiceAlbum.create({
                familyId,
                userId,
                voiceAlbumName,
                createdAt,
            });
            const newvoiceAlbumId = await voiceAlbum.findOne({
                _id: createdvoiceAlbum._id,
            });
            res.status(201).json({
                newvoiceAlbumId,
                msg: "새로운 앨범이 생성되었어요.",
            });
        } else {
            res.status(400).send({
                result: false,
                msg: "앨범 이름을 작성해주세요.",
            });
        }
    } catch (error) {
        console.log("앨범 생성 오류", error);
        res.status(400).send({
            result: false,
            msg: "앨범 생성 실패",
        });
    }
}

//보이스앨범 조회
// const getVoiceAlbum = async (req, res) => {
//     const { familyId } = req.params;

//     try {

//     }
// }


//음성파일 생성
const createVoiceFile = async (req, res) => {
    const { voiceAlbumId } = req.params;
    const { voiceFileTilte, voicePlayTime } = req.body;
    const { userId } = res.locals; // 패밀리 닉네임이랑 유저 프로필사진 필요한데.. 물어봐야될듯
    const { voiceFile } = req.file.location;
    const createdAt = new Date();
    // console.log(voiceAlbumId)
    // console.log(voiceFile, voicePlayTime)
    // console.log(userId)

    const voiceFileList = voiceFile.createVoiceFile({
        voiceAlbumId,
        voiceFileTilte,
        voiceFile,
        voicePlayTime,
        createdAt,
    });
    res.status(201).json({
        voiceFileList,
        msg: "음성메세지 추가되었습니다."
    })
}


//음성파일 조회
const getVoiceFile = async (req, res) => {
    const { voiceAlbumId } = req.params // api에 familyId가 있는데 왜필요하지..?

}

module.exports = { createVoiceAlbum, createVoiceFile }