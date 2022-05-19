const User = require("../schemas/user")
const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const MissionMember = require("../schemas/missionMember")
const Event = require("../schemas/event")
const VoiceFile = require("../schemas/voiceFile")

//유저 데이터 get API
const getUser = async (req, res) => {
  try {
    const { user } = res.locals
    user.password = ""
    const { userId } = res.locals.user
    const familyChk = await FamilyMember.find({ userId })
    console.log(123, familyChk)

    let familyList = []
    if (familyChk.length) {
      for (let family of familyChk) {
        const Checkedfamily = await Family.findOne({ _id: family.familyId })
        familyList.push(Checkedfamily)
      }
      console.log("유저정보", user, familyList)
      res.status(200).json({ user, familyList })
    } else {
      // familyList = []
      res.status(200).json({ user, familyList })
    }
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`)
    console.log("유저 데이터 GET에서 오류 발생!", error)

    res
      .status(400)
      .send({ errorMessage: "사용자 정보를 가져오지 못하였습니다." })
    return
  }
}

//프로필 조회 API
const getProfile = async (req, res) => {
  try {
    console.log(res.locals)
    const { email } = res.locals.user
    const userInfo = await User.findOne({ email })
    const nickname = userInfo.nickname
    const profileImg = userInfo.profileImg
    const todayMood = userInfo.todayMood

    const getMyprofile = res.status(200).json({
      nickname: nickname,
      profileImg: profileImg,
      todayMood: todayMood,
    })

    await getMyprofile
  } catch (error) {
    console.log("프로필 조회에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

//프로필 수정 API
const editProfile = async (req, res) => {
  try {
    const { userId } = res.locals.user
    const photoFile = req.file.location
    // 파일 업로드 공백 체크
    if (photoFile !== null) {
      const existUser = await User.findOne({ _id: userId })
      if (existUser) {
        // 유저 db 수정
        await User.updateOne(
          { _id: userId },
          { $set: { profileImg: photoFile } }
        )
        // 가족멤버 db 수정
        await FamilyMember.updateOne(
          { userId },
          { $set: { profileImg: photoFile } }
        )
        // 이벤트 db 수정
        await Event.updateOne({ userId }, { $set: { profileImg: photoFile } })
        // 미션멤버 db 수정
        await MissionMember.updateOne(
          { userId },
          { $set: { profileImg: photoFile } }
        )
        // 음성파일 db 수정
        await VoiceFile.updateOne(
          { userId },
          { $set: { profileImg: photoFile } }
        )
        res.status(200).json({
          photoFile,
          msg: "프로필 사진이 수정되었어요.",
        })
      }
    } else {
      res.status(400).send({
        result: false,
        msg: "사진을 등록해주세요.",
      })
    }
  } catch (error) {
    console.log("프로필 수정에서 오류!", error)
    res.status(400).send({
      result: false,
    })
  }
}

//오늘의 기분 수정 API
const editTodayMood = async (req, res) => {
  try {
    const { email } = res.locals.user
    const { todayMood } = req.body
    await User.updateOne({ email }, { $set: { todayMood: req.body.todayMood } })

    res.status(200).json({
      todayMood,
    })
  } catch (error) {
    console.log("오늘의기분 수정에서 오류!", error)
    res.status(400).send({ result: false })
  }
}

module.exports = {
  getUser,
  getProfile,
  editProfile,
  editTodayMood,
}
