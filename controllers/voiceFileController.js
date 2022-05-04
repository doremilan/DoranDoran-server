const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");
const FamilyMember = require("../schemas/familyMember");
const User = require("../schemas/user");



//음성파일 생성
const createVoiceFile = async (req, res) => {
    const { voiceAlbumId } = req.params;
    const { voiceFileTilte, voicePlayTime } = req.body;
    // const { userId } = res.locals;
    const { voiceFile } = req.file.location;
    const createdAt = new Date();
    const familyMemberNickname = await FamilyMember.findOne({
        familyMemberNickname,
    });
    console.log(voiceFileTilte.voicePlayTime)
    const profileImg = await FamilyMember.findOne({ profileImg });

    // console.log(voiceAlbumId)
    // console.log(voiceFile, voicePlayTime)
    // console.log(userId)

    const createVoice = voiceFile.create({
        voiceAlbumId,
        voiceFileTilte,
        voiceFile,
        voicePlayTime,
        familyMemberNickname,
        profileImg,
        createdAt,
    });
    res.status(201).json({
        createVoice,
        msg: "음성메세지 추가되었습니다.",
    });
};

// 음성파일 조회
const getVoiceFile = async (req, res) => {
    const { voiceAlbumId } = req.params;
    // const { userId } = res.locals.user;

    try {
        const [photoList] = await Photo.find({ voiceAlbumId }).sort("-createdAt");
        res.status(200).json({
            photoList,
        });
    } catch (error) {
        res.status(400).send({
            result: false,
            msg: "음성파일 조회에 실패했습니다.",
        });
    }
};

//음성파일 삭제
const deleteVoiceFile = async (req, res) => {
    const { voiceFileId } = req.params;
    const { userId } = res.locals.user;

    await VoiceFile.findOne({ voiceFileId, userId });
    await VoiceFile.deleteOne({ voiceFileId });

    res.status(200).send({
        result: true,
        msg: "음성파일 삭제가 완료되었습니다.",
    });
};

module.exports = {
    createVoiceFile,
    getVoiceFile,
    deleteVoiceFile,
};