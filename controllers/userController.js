const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const FamilyMember = require("../schemas/familyMember");
require("dotenv").config();

// 테스트 위해서 14번째, 15번째 줄의 profileImg 삭제

//유저 데이터 get API
//api 테스트 성공
const getUser = async (req, res) => {
  const {user} = res.locals;
  try {
    const email = user.email
    const nickname = user.nickname
    const profileImg = user.profileImg
    const familyMemberId = FamilyMember.findOne({familyMemberId})

    res.status(200).json({email, nickname, profileImg, familyMemberId});

  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    console.log("유저 데이터 GET에서 오류 발생!", error);

    res
      .status(400)
      .send({ errorMessage: "사용자 정보를 가져오지 못하였습니다." });
    return;
  }
};

//프로필 보기 API
//api 테스트 성공
const getProfile = async (req, res) => {
  try {
    const { user } = res.locals;
    
    const nickname = user.nickname
    const profileImg = user.profileImg
    const todayMood = user.todayMood

    const getMyprofile = res
      .status(200)
      .json({ nickname, profileImg, todayMood });

    await getMyprofile;
  } catch (error) {
    console.log("프로필 조회에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

//프로필 수정 API
//테스트 성공.
const editProfile = async (req, res) => {
  const { email } = res.locals.user;
  const { nickname, profileImg } = req.body;
  const EditMyProfile = await User.updateOne(
    { email },
    { $set: { nickname, profileImg } }
  );

  if (!nickname || !profileImg) {
    return res.json(200).send({
      nickname,
      profileImg,
    });
  } else if (!EditMyProfile) {
    console.log("프로필 수정에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

//오늘의 기분 수정 API
//테스트 성공.
const editTodayMood = async (req, res) => {
  try {
    const { email } = res.locals.user;
    const { todayMood } = req.body;
    await User.updateOne({ email }, { $set: { todayMood } });

    res.status(200).json({
      todayMood,
    });
  } catch (error) {
    console.log("오늘의기분 수정에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

module.exports = {
  getUser,
  getProfile,
  editProfile,
  editTodayMood,
};
