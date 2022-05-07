const VoiceAlbum = require('../schemas/voiceAlbum');
const VoiceFile = require('../schemas/voiceFile');
const FamilyMember = require('../schemas/familyMember');
const User = require('../schemas/user');

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

//음성파일 생성
const createVoiceFile = async (req, res) => {
  const { familyId, voiceAlbumId } = req.params;
  const { voiceTitle, voicePlayTime } = req.body;
  const { userId } = res.locals.user;
  const voiceFile = req.file.location;
  const createdAt = new Date();
  // console.log(11, userId)
  try {
    const userInfo = await FamilyMember.findOne({ userId });
    // console.log(22, userInfo)
    const familyMemberNickname = userInfo.familyMemberNickname;
    const profileImg = userInfo.profileImg;
    // console.log(33, familyMemberNickname, profileImg);
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
      msg: '음성메세지 추가되었습니다.',
    });
  } catch (error) {
    res.status(400).send({
      msg: '에러',
    });
    console.log(error);
  }
};

// 음성파일 조회
const getVoiceFile = async (req, res) => {
  const { voiceAlbumId } = req.params;
  // const { userId } = res.locals.user;
  console.log(11, voiceAlbumId);
  try {
    const albumName = await VoiceAlbum.findOne({ _id: voiceAlbumId });
    const voiceFileList = await VoiceFile.find({});
    res.status(200).json({
      voiceAlbumName: albumName.voiceAlbumName,
      voiceFileList,
    });
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: '음성파일 조회에 실패했습니다.',
    });
    console.log(error);
  }
};

//음성파일 삭제
const deleteVoiceFile = async (req, res) => {
  const { voiceFileId } = req.params;
  // const { userId } = res.locals.user;
  const { userId } = req.body;
  try {
    const [voiceInfo] = await VoiceFile.find({ _id: voiceFileId });
    // console.log(11, voiceInfo)
    const voiceFileURL = voiceInfo.voiceFile;
    // console.log(22, voiceFileURL)
    const deleteVoiceFile = voiceFileURL.split('/')[4];
    // console.log(33, deleteVoiceFile)
    const key1 = 'voice/' + decodeURI(deleteVoiceFile).replaceAll('+', ' ');
    // console.log(44, key1)
    await VoiceFile.findOne({ voiceFileId, userId });
    await VoiceFile.deleteOne({ voiceFileId });
    s3.deleteObject(
      {
        Bucket: 'family-8',
        Key: key1,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
      }
    );
    // console.log(s3)
    res.status(200).send({
      result: true,
      msg: '음성파일 삭제가 완료되었습니다.',
    });
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: '음성파일 삭제를 실패했습니다.',
    });
    console.log(error);
  }
};

module.exports = {
  createVoiceFile,
  getVoiceFile,
  deleteVoiceFile,
};
