const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");
const FamilyMember = require("../schemas/familyMember");
const User = require("../schemas/user");

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
};

//보이스앨범 조회
const getVoiceAlbum = async (req, res) => {
  const { familyId } = req.params;

  try {
    const [voiceAlbumList] = await VoiceAlbum.find({ familyId }).sort(
      "-createdAt"
    );

    res.status(200).json({
      voiceAlbumList,
    });
  } catch (error) {
    console.log("보이스앨범 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "보이스앨범 조회 실패",
    });
  }
};

//보이스 앨범 수정
const updateVoiceAlbum = async (req, res) => {
  const { voiceAlbumId } = req.params;
  const { voiceAlbumName } = req.body;

  const voiceAlbum = VoiceAlbum.findOne({ voiceAlbumId });
  if (!voiceAlbum) {
    return res.status(400).send({
      msg: "수정 실패",
    });
  } else {
    await voiceAlbum.updateOne({ voiceAlbumId }, { $set: { voiceAlbumName } });
    res.send(200).json({
      voiceAlbumName,
      msg: "앨범이 수정되었습니다.",
    });
  }
};

//보이스 앨범 삭제
const deleteVoiceAlbum = async (req, res) => {
  const { voiceAlbumId } = req.params;

  try {
    const existVoiceAlbum = await VoiceAlbum.findOne({ voiceAlbumId });
    if (existVoiceAlbum) {
      await VoiceAlbum.deleteOne({ voiceAlbumId });
      await VoiceFile.deleteOne({ voiceFileId });

      res.status(204).json({
        result: true,
        msg: "앨범이 성공적으로 삭제되었습니다.",
      });
    }
  } catch (error) {
    console.log("보이스앨범 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "앨범삭제에 실패하였습니다.",
    });
  }
};

//음성파일 생성
const createVoiceFile = async (req, res) => {
  const { voiceAlbumId } = req.params;
  const { voiceFileTilte, voicePlayTime } = req.body;
  const { userId } = res.locals;
  const { voiceFile } = req.file.location;
  const createdAt = new Date();
  const familyMemberNickname = await FamilyMember.findOne({
    familyMemberNickname,
  });
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
  const { userId } = res.locals.user;

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
  createVoiceAlbum,
  getVoiceAlbum,
  updateVoiceAlbum,
  deleteVoiceAlbum,
  createVoiceFile,
  getVoiceFile,
  deleteVoiceFile,
};
