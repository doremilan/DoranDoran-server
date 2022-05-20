const VoiceAlbum = require("../schemas/voiceAlbum")
const VoiceFile = require("../schemas/voiceFile")
const FamilyMember = require("../schemas/familyMember")
const User = require("../schemas/user")
const convertAndSaveS3 = require("../middlewares/converter")
const config = require("../config")

const AWS = require("aws-sdk")
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey,
  secretAccessKey: config.s3.secretKey,
  region: config.s3.bucketRegion,
})

//음성파일 생성
const createVoiceFile = async (req, res) => {
  try {
    console.log("녹음파일속성", req.file)
    const { familyId, voiceAlbumId } = req.params
    const { voiceTitle, voicePlayTime } = req.body
    const { userId } = res.locals.user
    const createdAt = new Date()
    // 녹음파일 변환
    const { location } = req.file
    const { key } = req.file
    const fileName1 = key.split("/")[1]
    const fileName2 = fileName1.split(".")[0]
    const newFileName = `${fileName2}.mp3`
    // const oldFileName = `${fileName2}.webm`
    const voiceFile = `${config.s3.s3Host}/voice/${newFileName}`
    console.log(voiceFile)
    await convertAndSaveS3(newFileName, location)
    // 변환 전 파일 삭제
    s3.deleteObject(
      {
        Bucket: "family-8",
        Key: "voice/" + fileName1.replaceAll("+", " "),
      },
      (err, data) => {
        if (err) {
          throw err
        }
      }
    )
    const userInfo = await FamilyMember.findOne({ familyId, userId })
    const familyMemberNickname = userInfo.familyMemberNickname
    const profileImg = userInfo.profileImg
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
      })
      res.status(201).json({
        voiceFileId: createVoice._id,
        msg: "음성메세지 추가되었습니다.",
      })
    } else {
      res.status(400).send({
        result: false,
        msg: "음성메세지 파일에러",
      })
    }
  } catch (error) {
    res.status(400).send({
      msg: "에러",
    })
    console.log(error)
  }
}

// 음성파일 조회
const getVoiceFile = async (req, res) => {
  const { voiceAlbumId } = req.params
  try {
    const albumName = await VoiceAlbum.findOne({ _id: voiceAlbumId })
    const voiceFileList = await VoiceFile.find({ voiceAlbumId })
    res.status(200).json({
      voiceAlbumName: albumName.voiceAlbumName,
      voiceFileList,
    })
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "음성파일 조회에 실패했습니다.",
    })
    console.log(error)
  }
}

//음성파일 삭제
const deleteVoiceFile = async (req, res) => {
  const { voiceFileId } = req.params
  const { userId } = req.body
  try {
    const voiceInfo = await VoiceFile.findOne({ _id: voiceFileId })
    // console.log(11, voiceInfo)
    const voiceFileURL = voiceInfo.voiceFile
    // console.log(22, voiceFileURL)
    const deleteVoiceFile = voiceFileURL.split("/")[4]
    // console.log(33, deleteVoiceFile)
    const key1 = "voice/" + decodeURI(deleteVoiceFile).replaceAll("+", " ")
    // console.log(44, key1)
    await VoiceFile.findOne({ voiceFileId, userId })
    await VoiceFile.deleteOne({ _id: voiceFileId })
    s3.deleteObject(
      {
        Bucket: "family-8",
        Key: key1,
      },
      (err, data) => {
        if (err) {
          throw err
        }
      }
    )
    res.status(200).send({
      result: true,
      msg: "음성파일 삭제가 완료되었습니다.",
    })
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "음성파일 삭제를 실패했습니다.",
    })
    console.log(error)
  }
}

module.exports = {
  createVoiceFile,
  getVoiceFile,
  deleteVoiceFile,
}
