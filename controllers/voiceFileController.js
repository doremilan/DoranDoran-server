const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");
const FamilyMember = require("../schemas/familyMember");
const User = require("../schemas/user");



//음성파일 생성
const createVoiceFile = async (req, res) => {
    const { familyId, voiceAlbumId } = req.params;
    const { userId, voiceTitle, voicePlayTime } = req.body;
    // const { userId } = res.locals;
    const voiceFile = req.file.location;
    const createdAt = new Date();
    try {
        const userInfo = await FamilyMember.findOne({ userId });
        const familyMemberNickname = userInfo.familyMemberNickname
        const profileImg = userInfo.profileImg
        console.log(familyMemberNickname, profileImg)
        const createVoice = await VoiceFile.create({
            voiceAlbumId,
            voiceTitle,
            voiceFile,
            voicePlayTime,
            familyId,
            familyMemberNickname,
            profileImg,
            createdAt,
        });
        res.status(201).json({
            createVoice,
            msg: "음성메세지 추가되었습니다.", z
        });
    } catch (error) {
        res.status(400).send({
            msg: "에러"
        })
        console.log(error)
    }
};

// 음성파일 조회
const getVoiceFile = async (req, res) => {
    const { voiceAlbumId } = req.params;
    // const { userId } = res.locals.user;
    console.log(11, voiceAlbumId)
    try {
        const voiceFileList = await VoiceFile.find({})  // 연결안되는중
        console.loe(22, voiceFileList)
        res.status(200).json({
            voiceFileList,
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