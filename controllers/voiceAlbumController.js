const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");

// 보이스 앨범 생성
const createVoiceAlbum = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  const { voiceAlbumName, voiceAlbumCover } = req.body;
  const createdAt = new Date();
  try {
    // 공백 체크
    if (voiceAlbumName !== null && voiceAlbumName !== "") {
      const createdvoiceAlbum = await VoiceAlbum.create({
        familyId,
        userId,
        voiceAlbumName,
        voiceAlbumCover,
        createdAt,
      });
      const newvoiceAlbumId = await VoiceAlbum.findOne({
        _id: createdvoiceAlbum._id,
      });
      res.status(201).json({
        voiceAlbumId: newvoiceAlbumId._id,
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

// 보이스 앨범 조회
const getVoiceAlbum = async (req, res) => {
  const { familyId } = req.params;
  try {
    const voiceAlbumList = await VoiceAlbum.find({ familyId });
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

// 보이스 앨범 수정
const updateVoiceAlbum = async (req, res) => {
  const { voiceAlbumId } = req.params;
  const { voiceAlbumName, voiceAlbumCover } = req.body;
  try {
    if (voiceAlbumName !== null && voiceAlbumName !== "") {
      const existVoiceAlbum = await VoiceAlbum.findOne({ _id: voiceAlbumId });
      if (existVoiceAlbum) {
        await VoiceAlbum.updateOne(
          { _id: voiceAlbumId },
          { $set: { voiceAlbumName, voiceAlbumCover } }
        );
      }
      res.status(200).json({
        voiceAlbumName,
        voiceAlbumCover,
        msg: "앨범이 수정되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "앨범 이름을 작성해주세요.",
      });
    }
  } catch (error) {
    console.log("보이스 앨범 수정 오류", error);
    res.status(400).send({
      result: false,
      msg: "보이스앨범 수정 실패",
    });
  }
};

// 보이스 앨범 삭제
const deleteVoiceAlbum = async (req, res) => {
  const { voiceAlbumId } = req.params;
  try {
    const existVoiceAlbum = await VoiceAlbum.findOne({ _id: voiceAlbumId });
    if (existVoiceAlbum) {
      await VoiceAlbum.deleteOne({ _id: voiceAlbumId });
      await VoiceFile.deleteMany({
        voiceAlbumId: existVoiceAlbum.voiceAlbumId,
      });
      res.status(204).json({
        result: true,
        msg: "보이스 앨범이 삭제되었어요.",
      });
    }
  } catch (error) {
    console.log("보이스앨범 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "앨범 삭제 실패",
    });
  }
};

module.exports = {
  createVoiceAlbum,
  getVoiceAlbum,
  updateVoiceAlbum,
  deleteVoiceAlbum,
};
