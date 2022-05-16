const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const User = require("../schemas/user")
const Mission = require("../schemas/mission")
const Badge = require("../schemas/badge")
const Comment = require("../schemas/comment")
const Event = require("../schemas/event")
const Photo = require("../schemas/photo")
const PhotoAlbum = require("../schemas/photoAlbum")
const VoiceAlbum = require("../schemas/voiceAlbum")
const VoiceFile = require("../schemas/voiceFile")
const Like = require("../schemas/like")
const MissionMember = require("../schemas/missionMember")
const MissionChk = require("../schemas/missionChk")
const Joi = require("joi")

const familySchema = Joi.object({
  familyTitle: Joi.string()
    .max(8)
    .pattern(new RegExp("^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣+]*$"))
    .required(),
})
// 최대 8 자 / 숫자,영어,한글만 가능 / 특수문자 불가능/ 띄어쓰기 불가.

const familyMemberSchema = Joi.object({
  email: Joi.string(),
  familyMemberNickname: Joi.string().min(2).max(8).required(),
  // 2~8자
})

//가족 목록 GET API
const getFamilyList = async (req, res) => {
  try {
    const { userId } = res.locals.user
    const familyChk = await FamilyMember.find({ userId })

    let familyList = []

    if (familyChk.length) {
      for (let family of familyChk) {
        const Checkedfamily = await Family.findOne({ _id: family.familyId })
        familyList.push(Checkedfamily)
      }
      res.status(200).json({ familyList })
    } else if (familyListUnique) {
      new Set(familyList)
      res.status(200).json({ familyList })
    } else {
      res.status(200).json({ familyList })
    }
  } catch (error) {
    console.log("가족 리스트 조회에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

//가족 생성 API
//api 테스트 성공`
const createFamily = async (req, res) => {
  try {
    const { user } = res.locals

    console.log("가족 생성의 user-->", user)

    let { familyTitle } = await familySchema.validateAsync(req.body)

    const newFamily = await Family.create({
      familyTitle,
      familyHost: user.userId,
    })

    const familyHost = await FamilyMember.create({
      familyId: newFamily.familyId,
      familyMemberNickname: user.nickname,
      userId: user.userId,
      profileImg: user.profileImg,
    })

    // 배지 자동생성
    await Badge.create({
      familyId: newFamily.familyId,
      badge: [
        {
          badgeChk: false,
          badgeTitle: "단란한 시작",
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: "추억의 발자국",
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: "정겨운 목소리",
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: "협동의 즐거움",
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: "소통의 기쁨",
          badgeCnt: 0,
        },
        {
          badgeChk: false,
          badgeTitle: "함께하는 나날",
          badgeCnt: 0,
        },
      ],
    })

    console.log("familyHost-->", familyHost)

    res
      .status(200)
      .json({ msg: "가족이 생성되었습니다.", familyId: newFamily.familyId })
  } catch (error) {
    console.log("가족 생성에서 오류!", error)
    res.status(400).send({ msg: "가족 생성에 실패했습니다." })
  }
}

//가족 구성원 생성 api
//api 테스트 성공
const createFamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params
    let { email, familyMemberNickname } =
      await familyMemberSchema.validateAsync(req.body)

    const newFamilyMember = await User.findOne({ email })
    const userId = newFamilyMember.userId
    const existMember = await FamilyMember.findOne({
      familyId: familyId,
      userId: userId,
    })
    const existMemberNickname = await FamilyMember.findOne({
      familyId: familyId,
      familyMemberNickname,
    })

    if (existMember) {
      res.status(400).send({
        msg: "이미 추가되어 있는 구성원입니다.",
      })
    } else if (existMemberNickname) {
      res.status(400).send({
        msg: "중복된 호칭이 있습니다.",
      })
    }

    if (newFamilyMember.profileImg) {
      profileImg = newFamilyMember.profileImg
    } else {
      profileImg = null
    }

    const familyMember = await FamilyMember.create({
      familyId: familyId,
      familyMemberNickname,
      userId: userId,
      profileImg,
    })

    res.status(201).json({
      restult: true,
      familyMember,
    })
  } catch (error) {
    console.log("멤버 생성에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

//멤버 검색 API
const searchUser = async (req, res) => {
  try {
    const { search } = req.query
    let searchKeyword = await User.find({ $text: { $search: search } })
    const userEmail = searchKeyword[0].email
    res.status(200).json({
      userEmail,
    })
  } catch (error) {
    console.log("이메일 없음", error)
    res.status(400).send({
      result: false,
      msg: "해당 이메일과 일치하는 정보가 없어요!",
    })
  }
}

//가족구성원 조회 API
//user의 userId를 -> userId로 FamlilyMember db에서 member를 찾는다. ->
const getfamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params
    const familyMemberList = await FamilyMember.find({ familyId: familyId })

    res.status(200).json({ familyMemberList })
  } catch (error) {
    console.log("가족 구성원 조회에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

//가족 이름 수정 API
//api 테스트 성공
const editFamilyTitle = async (req, res) => {
  try {
    const { familyId } = req.params
    const { familyTitle } = await familySchema.validateAsync(req.body)
    const { email } = res.locals.user

    await Family.updateOne({ email, _id: familyId }, { $set: { familyTitle } })

    console.log("_id:familyId-->", familyId)

    res.status(200).json({
      familyId,
      familyTitle,
    })
  } catch (error) {
    console.log("가족 이름 수정에서 오류!", error)
    res.status(400).send({
      result: false,
    })
  }
}

//가족 구성원 수정 API
//api 테스트 성공
const editFamilyMember = async (req, res) => {
  try {
    const { familyId, familyMemberId } = req.params
    let { familyMemberNickname } = await familyMemberSchema.validateAsync(
      req.body
    )
    const { email } = res.locals.user

    await FamilyMember.updateOne(
      { email, _id: familyId, _id: familyMemberId },
      { $set: { familyMemberNickname } }
    )

    const modifyFamilyMemberList = await FamilyMember.find({
      _id: familyId,
      _id: familyMemberId,
    })

    res.status(200).json({ modifyFamilyMemberList })
  } catch (error) {
    console.log("가족 구성원 수정에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

//가족 삭제 API
//api 테스트 성공
const deleteFamily = async (req, res) => {
  try {
    const { familyId } = req.params
    const { email } = res.locals.user

    console.log("삭제 email-->", email)
    console.log("삭제 familyId-->", familyId)

    await Family.deleteOne({ _id: familyId })
    await FamilyMember.deleteMany({ familyId: familyId })
    await Mission.deleteMany({ familyId: familyId })
    await Badge.deleteMany({ familyId: familyId })
    await Comment.deleteMany({ familyId: familyId })
    await Event.deleteMany({ familyId: familyId })
    await Photo.deleteMany({ familyId: familyId })
    await PhotoAlbum.deleteMany({ familyId: familyId })
    await VoiceAlbum.deleteMany({ familyId: familyId })
    await VoiceFile.deleteMany({ familyId: familyId })
    await Like.deleteMany({ familyId: familyId })
    await MissionMember.deleteMany({ familyId: familyId })
    await MissionChk.deleteMany({ familyId: familyId })

    res.status(200).json({ msg: "가족이 삭제됐습니다." })
  } catch (error) {
    console.log("가족 삭제에서 오류!", error)
    res.status(400).send({ msg: "가족 삭제에 실패했습니다." })
  }
}

//가족 구성원 삭제 API
//api 테스트 성공
const deleteFamilyMember = async (req, res) => {
  try {
    const { familyMemberId } = req.params
    const { email } = res.locals.user

    console.log("삭제 email-->", email)
    console.log("삭제 familyMemberId-->", familyMemberId)
    await FamilyMember.deleteOne({ _id: familyMemberId })

    res.status(200).json({ msg: "가족 구성원이 삭제됐습니다" })
  } catch (error) {
    console.log("가족 구성원 삭제에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

module.exports = {
  getFamilyList,
  createFamily,
  createFamilyMember,
  searchUser,
  getfamilyMember,
  editFamilyTitle,
  editFamilyMember,
  deleteFamily,
  deleteFamilyMember,
}
