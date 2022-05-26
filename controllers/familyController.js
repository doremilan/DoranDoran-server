const Family = require("../schemas/family");
const FamilyMember = require("../schemas/familyMember");
const User = require("../schemas/user");
const Mission = require("../schemas/mission");
const MissionMember = require("../schemas/missionMember");
const MissionChk = require("../schemas/missionChk");
const Badge = require("../schemas/badge");
const Comment = require("../schemas/comment");
const Event = require("../schemas/event");
const Photo = require("../schemas/photo");
const PhotoAlbum = require("../schemas/photoAlbum");
const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");
const Like = require("../schemas/like");
const Joi = require("joi");

//가족이름: 2-15자 / 숫자, 영어, 한국어와 언더스코어, 공백 허용/ 특수문자 불가
// const familySchema = Joi.object({
//   familyTitle: Joi.string()
//     .pattern(new RegExp("^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{1,8}$"))
//     .required(),
// });

//가족 멤버 닉네임: 2-8자 / 숫자, 영어, 한국어와 언더스코어, 공백 허용/ 특수문자 불가
// const familyMemberSchema = Joi.object({
//   email: Joi.string(),
//   familyMemberNickname: Joi.string()
//     .pattern(new RegExp("^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{1,8}$"))
//     .required(),
// });

//가족 목록 조회
const getFamilyList = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const familyChk = await FamilyMember.find({ userId });

    let familyList = [];
    if (familyChk.length) {
      for (let family of familyChk) {
        const Checkedfamily = await Family.findOne({ _id: family.familyId });
        familyList.push(Checkedfamily);
      }
    }
    res.status(200).json({
      familyList,
    });
  } catch (error) {
    console.log("가족 리스트 조회에서 오류!", error);
    res.status(400).send({
      result: false,
    });
  }
};

// 가족 생성
const createFamily = async (req, res) => {
  try {
    const { user } = res.locals;
    let { familyTitle } = req.body;
    const newFamily = await Family.create({
      familyTitle,
      familyHost: user.userId,
    });
    const familyHost = await FamilyMember.create({
      familyId: newFamily.familyId,
      familyMemberNickname: user.nickname,
      userId: user.userId,
      profileImg: user.profileImg,
      todayMood: null,
    });
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
    });
    res.status(200).json({
      msg: "가족이 생성되었어요",
      familyId: newFamily.familyId,
    });
  } catch (error) {
    console.log("가족 생성 오류", error);
    res.status(400).send({
      msg: "가족 생성 실패",
    });
  }
};

//가족 구성원 추가
const createFamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params;
    const { email, familyMemberNickname } = req.body;
    // 새 구성원 추가
    const newFamilyMember = await User.findOne({ email });
    const userId = newFamilyMember.userId;
    // 카카오 로그인 유저의 경우 오늘의 기분 예외처리
    let todayMood;
    if (newFamilyMember.snsId && todayMood === null) {
      todayMood = null;
    } else {
      todayMood = newFamilyMember.todayMood;
    }
    const existMember = await FamilyMember.findOne({
      familyId: familyId,
      userId: userId,
    });
    const existMemberNickname = await FamilyMember.findOne({
      familyId: familyId,
      familyMemberNickname,
    });
    if (existMember) {
      res.status(400).send({});
    } else if (existMemberNickname) {
      res.status(400).send({});
    }
    // 프로필 이미지 없을 경우 키값 생성
    if (newFamilyMember.profileImg) {
      profileImg = newFamilyMember.profileImg;
    } else {
      profileImg = null;
    }
    // 오늘의 기분 상태값 없을 경우 키값 생성
    if (newFamilyMember.todayMood) {
      todayMood = newFamilyMember.todayMood;
    } else {
      todayMood = null;
    }
    const familyMember = await FamilyMember.create({
      familyId,
      familyMemberNickname,
      userId,
      profileImg,
      todayMood,
    });
    res.status(201).json({
      restult: true,
      familyMember,
    });
  } catch (error) {
    console.log("가족 구성원 추가 오류", error);
    res.status(400).send({
      result: false,
    });
  }
};

// 가족 구성원 검색
const searchUser = async (req, res) => {
  const { search } = req.query;
  try {
    let searchKeywords = await User.find({ $text: { $search: search } });
    if (searchKeywords.length) {
      for (let searchKeyword of searchKeywords) {
        const keyword1 = search.split("@");
        const keyword2 = searchKeyword.email.split("@");
        if (search === searchKeyword.email) {
          const userEmail = searchKeyword.email;
          return res.status(200).json({
            userEmail,
          });
        } else if (keyword1[0] === keyword2[0] && keyword1[1] !== keyword2[1]) {
          const userEmail = searchKeyword.email;
          return res.status(200).json({
            userEmail,
          });
        }
      }
      res.status(400).send({
        result: false,
        msg: "해당 이메일과 일치하는 정보가 없어요!",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "해당 이메일과 일치하는 정보가 없어요!",
      });
    }
  } catch (error) {
    console.log("검색 오류", error);
    res.status(400).send({
      result: false,
      msg: "가족 구성원 검색 실패",
    });
  }
};

//가족구성원 목록 조회
const getfamilyMember = async (req, res) => {
  try {
    const { familyId } = req.params;
    const familyMemberList = await FamilyMember.find({ familyId });
    for (let familyMember of familyMemberList) {
      const getEmail = await User.findOne({ _id: familyMember.userId });
      familyMember.email = getEmail.email;
    }
    res.status(200).json({
      familyMemberList,
    });
  } catch (error) {
    console.log("가족 구성원 조회 오류", error);
    res.status(400).send({
      result: false,
    });
  }
};

//가족이름 수정
const editFamilyTitle = async (req, res) => {
  try {
    const { familyId } = req.params;
    const { familyTitle } = req.body;
    const { email } = res.locals.user;
    await Family.updateOne({ email, _id: familyId }, { $set: { familyTitle } });
    res.status(200).json({
      familyId,
      familyTitle,
    });
  } catch (error) {
    console.log("가족이름 수정 오류", error);
    res.status(400).send({
      result: false,
    });
  }
};

//가족멤버 닉네임 수정
const editFamilyMember = async (req, res) => {
  try {
    const { familyId, familyMemberId } = req.params;
    let { familyMemberNickname } = req.body;
    await FamilyMember.updateOne(
      { familyId, _id: familyMemberId },
      { $set: { familyMemberNickname } }
    );
    const modifyFamilyMemberList = await FamilyMember.findOne({
      familyId,
      _id: familyMemberId,
    });
    // 음성 파일 수정
    await VoiceFile.updateMany(
      { familyId, userId: modifyFamilyMemberList.userId },
      { $set: { familyMemberNickname } }
    );
    // 미션멤버 수정
    await MissionMember.updateMany(
      { familyId, userId: modifyFamilyMemberList.userId },
      { $set: { familyMemberNickname } }
    );
    res.status(200).json({ modifyFamilyMemberList });
  } catch (error) {
    console.log("가족 구성원 수정에서 오류!", error);
    res.status(400).send({ result: false });
  }
};

// 가족 삭제
const deleteFamily = async (req, res) => {
  const { familyId } = req.params;
  try {
    await Family.deleteOne({ _id: familyId });
    await FamilyMember.deleteMany({ familyId });
    await Mission.deleteMany({ familyId });
    await Badge.deleteMany({ familyId });
    await Comment.deleteMany({ familyId });
    await Event.deleteMany({ familyId });
    await Photo.deleteMany({ familyId });
    await PhotoAlbum.deleteMany({ familyId });
    await VoiceAlbum.deleteMany({ familyId });
    await VoiceFile.deleteMany({ familyId });
    await Like.deleteMany({ familyId });
    await MissionMember.deleteMany({ familyId });
    await MissionChk.deleteMany({ familyId });
    res.status(200).json({
      msg: "가족이 삭제됬어요.",
    });
  } catch (error) {
    console.log("가족 삭제 오류!", error);
    res.status(400).send({
      msg: "가족 삭제 실패",
    });
  }
};

//가족 구성원 삭제
const deleteFamilyMember = async (req, res) => {
  const { familyMemberId } = req.params;
  try {
    await FamilyMember.deleteOne({ _id: familyMemberId });
    await MissionMember.deleteMany({ familyMemberId });
    await MissionChk.deleteMany({ familyMemberId });
    res.status(200).json({
      msg: "가족 멤버가 삭제되었어요.",
    });
  } catch (error) {
    console.log("가족 구성원 삭제 오류", error);
    res.status(400).send({
      result: false,
    });
  }
};

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
};
