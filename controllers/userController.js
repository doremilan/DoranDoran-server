const express = require("express")
const router = express.Router()
const User = require("../schemas/user")
const Family = require("../schemas/family")
const FamilyMember = require("../schemas/familyMember")
const jwt = require("jsonwebtoken")
const fs = require("fs")
require("dotenv").config()

//유저 데이터 get API
const getUser = async (req, res) => {
  try {
    const { user } = res.locals
    user.password = ""
    const { userId } = res.locals.user
    const familyChk = await FamilyMember.find({ userId })

    let familyList = []
    if (familyChk.length) {
      for (let family of familyChk) {
        const Checkedfamily = await Family.findOne({ _id: family.familyId })
        familyList.push(Checkedfamily)
      }
      res.status(200).json({ user, familyList })
    } else {
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
    const { email } = res.locals.user
    const { nickname, profileImg } = req.body

    await User.updateOne(
      { email },
      {
        $set: {
          nickname: req.body.nickname,
          profileImg: req.body.profileImg,
        },
      }
    )

    res.status(200).json({
      nickname,
      profileImg,
    })
  } catch (error) {
    console.log("프로필 수정에서 오류!", error)
    res.status(400).send({ result: false })
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
