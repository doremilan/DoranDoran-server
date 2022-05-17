const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const User = require("../schemas/user")
const Mission = require("../schemas/mission")
const MissionMember = require("../schemas/missionMember")
const MissionChk = require("../schemas/missionChk")
const Badge = require("../schemas/badge")
const Comment = require("../schemas/comment")
const Event = require("../schemas/event")
const Photo = require("../schemas/photo")
const PhotoAlbum = require("../schemas/photoAlbum")
const VoiceAlbum = require("../schemas/voiceAlbum")
const VoiceFile = require("../schemas/voiceFile")
const Like = require("../schemas/like")
const Joi = require("joi")

const familySchema = Joi.object({
  familyTitle: Joi.string()
    .pattern(new RegExp("^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$"))
    .required(),
})
//2-15자 / 숫자, 영어, 한국어와 언더스코어, 공백 허용/ 특수문자 불가

const familyMemberSchema = Joi.object({
  email: Joi.string(),
  familyMemberNickname: Joi.string()
    .pattern(new RegExp("^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,8}$"))
    .required(),
  //r가족 멤버 닉네임 - 2-8자 / 숫자, 영어, 한국어와 언더스코어, 공백 허용/ 특수문자 불가
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
      todayMood: null,
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
    console.log(1, email, familyMemberNickname)

    const newFamilyMember = await User.findOne({ email })
    const userId = newFamilyMember.userId
    let todayMood
    if (newFamilyMember.snsId && todayMood === null) {
      todayMood = null
      console.log(2, newFamilyMember, userId, todayMood)
    } else {
      todayMood = newFamilyMember.todayMood
      console.log(3, newFamilyMember, userId, todayMood)
    }

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

    if (newFamilyMember.todayMood) {
      todayMood = newFamilyMember.todayMood
    } else {
      todayMood = null
    }

    const familyMember = await FamilyMember.create({
      familyId: familyId,
      familyMemberNickname,
      userId: userId,
      profileImg,
      todayMood,
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

//멤버 검색 API (전체 일치만 검색)
// const searchUser = async (req, res) => {
//   try {
//     const { search } = req.query
//     let searchKeyword = await User.findOne({ email: search })
//     const userEmail = searchKeyword.email
//     res.status(200).json({
//       userEmail,
//     })
//   } catch (error) {
//     console.log("이메일 없음", error)
//     res.status(400).send({
//       result: false,
//       msg: "해당 이메일과 일치하는 정보가 없어요!",
//     })
//   }
// }

// 멤버 검색 API (앞자리 일치만 검색)
const searchUser = async (req, res) => {
  const { search } = req.query
  try {
    let searchKeywords = await User.find({ $text: { $search: search } })
    console.log(1, searchKeywords)

    if (searchKeywords.length) {
      for (let searchKeyword of searchKeywords) {
        console.log(2, searchKeyword)
        const keyword1 = search.split("@")
        const keyword2 = searchKeyword.email.split("@")
        console.log(3, keyword1, keyword2)

        if (search === searchKeyword.email) {
          const userEmail = searchKeyword.email
          console.log(5, userEmail)
          return res.status(200).json({
            userEmail,
          })
        } else if (keyword1[0] === keyword2[0] && keyword1[1] !== keyword2[1]) {
          const userEmail = searchKeyword.email
          console.log(4, userEmail)
          return res.status(200).json({
            userEmail,
          })
        }
      }
      res.status(400).send({
        result: false,
        msg: "해당 이메일과 일치하는 정보가 없어요!",
      })
    } else {
      res.status(400).send({
        result: false,
        msg: "해당 이메일과 일치하는 정보가 없어요!",
      })
    }
  } catch (error) {
    console.log("검색 오류", error)
    res.status(400).send({
      result: false,
      msg: "가족 구성원 검색 실패",
    })
  }
}

//가족구성원 조회 API
const getfamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params
    const familyMemberList = await FamilyMember.find({ familyId })
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
    await FamilyMember.deleteMany({ familyId })
    await Mission.deleteMany({ familyId })
    await Badge.deleteMany({ familyId })
    await Comment.deleteMany({ familyId })
    await Event.deleteMany({ familyId })
    await Photo.deleteMany({ familyId })
    await PhotoAlbum.deleteMany({ familyId })
    await VoiceAlbum.deleteMany({ familyId })
    await VoiceFile.deleteMany({ familyId })
    await Like.deleteMany({ familyId })
    await MissionMember.deleteMany({ familyId })
    await MissionChk.deleteMany({ familyId })

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
    await MissionMember.deleteMany({ familyMemberId })
    await MissionChk.deleteMany({ familyMemberId })

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
