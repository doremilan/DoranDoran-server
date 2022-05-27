const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");
const FamilyMember = require("../schemas/familyMember");
const convertAndSaveS3 = require("../middlewares/converter");
const config = require("../config");

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey,
  secretAccessKey: config.s3.secretKey,
  region: config.s3.bucketRegion,
});

// 음성메시지 생성
const createVoiceFile = async (req, res) => {
  try {
    const { familyId, voiceAlbumId } = req.params;
    const { voiceTitle, voicePlayTime } = req.body;
    const { userId } = res.locals.user;
    const createdAt = new Date();
    // 녹음파일 변환
    const { location } = req.file;
    const { key } = req.file;
    const fileName1 = key.split("/")[1];
    const fileName2 = fileName1.split(".")[0];
    const newFileName = `${fileName2}.mp3`;
    const voiceFile = `${config.s3.s3Host}/voice/${newFileName}`;
    await convertAndSaveS3(newFileName, location);
    // 변환 전 파일 삭제
    s3.deleteObject(
      {
        Bucket: "family-8",
        Key: "voice/" + fileName1.replaceAll("+", " "),
      },
      (err, data) => {
        if (err) {
          throw err;
        }
      }
    );
    const userInfo = await FamilyMember.findOne({ familyId, userId });
    const familyMemberNickname = userInfo.familyMemberNickname;
    const profileImg = userInfo.profileImg;
    if (voiceFile !== null) {
      const createVoice = await VoiceFile.create({
        userId,
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
        voiceFileId: createVoice._id,
        msg: "음성 메세지가 추가되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "음성 메세지 추가 실패",
      });
    }
  } catch (error) {
    console.log("음성메시지 추가 오류", error);
    res.status(400).send({
      msg: "음성메시지 추가 실패",
    });
  }
};

// 음성파일 조회
const getVoiceFile = async (req, res) => {
  const { voiceAlbumId } = req.params;
  try {
    const albumName = await VoiceAlbum.findOne({ _id: voiceAlbumId });
    const voiceFileList = await VoiceFile.find({ voiceAlbumId });
    res.status(200).json({
      voiceAlbumName: albumName.voiceAlbumName,
      voiceFileList,
    });
  } catch (error) {
    console.log("음성메시지 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "음성메시지 조회 실패",
    });
  }
};

//음성파일 삭제
const deleteVoiceFile = async (req, res) => {
  const { voiceFileId } = req.params;
  const { userId } = req.body;
  try {
    const voiceInfo = await VoiceFile.findOne({ _id: voiceFileId });
    const voiceFileURL = voiceInfo.voiceFile;
    const deleteVoiceFile = voiceFileURL.split("/")[4];
    const key1 = "voice/" + decodeURI(deleteVoiceFile).replaceAll("+", " ");
    await VoiceFile.findOne({ voiceFileId, userId });
    await VoiceFile.deleteOne({ _id: voiceFileId });
    s3.deleteObject(
      {
        Bucket: "family-8",
        Key: key1,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
      }
    );
    res.status(200).send({
      result: true,
      msg: "음성메시지가 삭제 되었어요.",
    });
  } catch (error) {
    console.log("음성메시지 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "음성메시지 삭제 실패",
    });
  }
};

module.exports = {
  createVoiceFile,
  getVoiceFile,
  deleteVoiceFile,
};
