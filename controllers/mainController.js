const User = require("../schemas/user");
const Family = require("../schemas/family");
const FamilyMember = require("../schemas/familyMember");
const Mission = require("../schemas/mission");
const MissionMember = require("../schemas/missionMember");
const MissionChk = require("../schemas/missionChk");
const Badge = require("../schemas/badge");
const Photo = require("../schemas/photo");
const VoiceAlbum = require("../schemas/voiceAlbum");
const VoiceFile = require("../schemas/voiceFile");
const Comment = require("../schemas/comment");
const Connect = require("../schemas/connect");
const Event = require("../schemas/event");
const RandomMsg = require("../schemas/randomMsg");

// 알림 등록 시간 체크
function timeForToday(createdAt) {
  const today = new Date();
  const timeValue = new Date(createdAt);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  ); // 분
  if (betweenTime < 1) return "방금 전"; // 1분 미만이면 방금 전
  if (betweenTime < 60) return `${betweenTime}분 전`; // 60분 미만이면 n분 전

  const betweenTimeHour = Math.floor(betweenTime / 60); // 시
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`; // 24시간 미만이면 n시간 전

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24); // 일
  if (betweenTimeDay < 7) return `${betweenTimeDay}일 전`; // 7일 미만이면 n일 전
  if (betweenTimeDay < 365)
    return `${timeValue.getMonth() + 1}월 ${timeValue.getDate()}일`; // 365일 미만이면 년을 제외하고 월 일만

  return `${timeValue.getFullYear()}년 ${
    timeValue.getMonth() + 1
  }월 ${timeValue.getDate()}일`; // 365일 이상이면 년 월 일
}

// 메인화면 조회
const getMainPage = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  try {
    // 랜덤메시지 랜덤추출
    const randomMsg = await RandomMsg.aggregate([{ $sample: { size: 1 } }]);
    // 유저정보 추출
    const userInfo = await User.findOne({ _id: userId });
    // 가족정보 추출
    const familyInfo = await Family.findOne({ _id: familyId });
    // 최신사진 추출
    let recentPhoto = {};
    const photos = await Photo.find({ familyId }).sort("-createdAt");
    if (photos.length) {
      recentPhoto = photos[0];
    }
    // 최신 음성메시지 추출
    let recentVoiceFile = {};
    const voiceFiles = await VoiceFile.find({ familyId }).sort("-createdAt");
    if (voiceFiles.length) {
      recentVoiceFile = voiceFiles[0];
    }
    let voiceAlbumInfo = {};
    if (recentVoiceFile) {
      voiceAlbumInfo = await VoiceAlbum.findOne(
        {
          _id: recentVoiceFile.voiceAlbumId,
        },
        "voiceAlbumCover"
      );
    }

    // 이번달 일정 추출
    const thisMonth = new Date()
      .toISOString()
      .substring(0, 7)
      .replace(/-/g, "");
    const thisMonthEventList = [];
    const events = await Event.find({ familyId }).sort("-createdAt");
    if (events.length) {
      for (let event of events) {
        if (event.startDate.split("-").splice(0, 2).join("") === thisMonth) {
          thisMonthEventList.push(event);
        }
      }
    }
    // 최신 미션 및 미션 멤버 추출
    let recentMission = {};
    let recentMissionUser = {};
    let recentMissionMembers = [];
    const missions = await Mission.find({ familyId }).sort("-createdAt");
    if (missions.length) {
      recentMission = missions[0];
      if (recentMission) {
        recentMissionUser = await FamilyMember.findOne(
          {
            userId: recentMission.userId,
            familyId,
          },
          "familyMemberNickname"
        );
        recentMissionMembers = await MissionMember.find(
          {
            missionId: recentMission.missionId,
          },
          "familyMemberNickname profileImg myMissionChk familyMemberId"
        );
        const completedMembers = await MissionChk.find({
          missionId: recentMission.missionId,
        });
        // 각 멤버의 미션완료 여부 체크
        let myMissionChk = false;
        // 완료멤버가 없을 시 예외처리 (빈 객체 속성을 배열로 바꿔서 체크)
        if (Object.keys(completedMembers).length === 0) {
          recentMissionMembers.map((missionMember) => {
            myMissionChk = false;
            missionMember.myMissionChk = myMissionChk;
          });
        }
        recentMissionMembers.filter((missionMember) => {
          completedMembers.forEach((completedMember) => {
            if (
              completedMember.familyMemberId === missionMember.familyMemberId
            ) {
              myMissionChk = true;
              missionMember.myMissionChk = myMissionChk;
              // 중복체크 예외처리
            } else if (missionMember.myMissionChk === true) {
              missionMember.myMissionChk === true;
            } else if (
              completedMember.familyMemberId !== missionMember.familyMemberId
            ) {
              myMissionChk = false;
              missionMember.myMissionChk = myMissionChk;
            }
          });
        });
      }
    }
    // 획득배지 랜덤추출
    const badgeList = await Badge.findOne({ familyId });
    const badges = badgeList.badge;
    let checkedbadges = [];
    for (let badge of badges) {
      // 1번 배지 획득 여부체크
      if (badge.badgeTitle === "단란한 시작") {
        checkedbadges.push(badge);
      }
      // 2번 배지 획득 여부 체크
      if (badge.badgeTitle === "추억의 발자국") {
        const existPhoto = await Photo.find({ familyId });
        if (existPhoto.length >= 15) {
          checkedbadges.push(badge);
        }
      }
      // 3번 배지 획득 여부 체크
      if (badge.badgeTitle === "정겨운 목소리") {
        const existVoiceFile = await VoiceFile.find({ familyId });
        if (existVoiceFile.length >= 10) {
          checkedbadges.push(badge);
        }
      }
      // 4번 배지 획득 여부 체크
      if (badge.badgeTitle === "협동의 즐거움") {
        const existMission = await Mission.find({ familyId });
        if (existMission.length >= 20) {
          checkedbadges.push(badge);
        }
      }
      // 5번 배지 획득 여부 체크
      if (badge.badgeTitle === "소통의 기쁨") {
        const existComment = await Comment.find({ familyId });
        if (existComment.length >= 50) {
          checkedbadges.push(badge);
        }
      }
      // 6번 배지 획득 여부 체크
      if (badge.badgeTitle === "함께하는 나날") {
        const existEvent = await Event.find({ familyId });
        if (existEvent.length >= 5) {
          checkedbadges.push(badge);
        }
      }
    }
    // 획득배지 랜덤추출
    let randomValue = Math.floor(Math.random() * checkedbadges.length);
    const randomBadge = checkedbadges[randomValue];
    res.status(200).json({
      randomMsg,
      userInfo,
      familyInfo,
      recentPhoto,
      recentVoiceFile,
      voiceAlbumInfo,
      thisMonthEventList,
      recentMission,
      recentMissionUser,
      recentMissionMembers,
      randomBadge,
    });
  } catch (error) {
    console.log("메인화면 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "메인화면 조회 실패",
    });
  }
};

//가족구성원 접속 상태조회 API
const getConnected = async (req, res) => {
  const { familyId } = req.params;
  try {
    const familyMemberList = await FamilyMember.find({ familyId });
    let familyMemberStatusList = [];
    for (let familyConnect of familyMemberList) {
      const userConnect = await Connect.findOne({
        userId: familyConnect.userId,
      });
      if (userConnect) {
        userConnect.connectedAt = timeForToday(userConnect.connectedAt);
        familyMemberStatusList.push(userConnect);
      }
    }
    res.status(200).json({
      familyMemberStatusList,
    });
  } catch (error) {
    console.log("가족구성원 접속상태 조회 오류", error);
    res.status(400).send({
      result: false,
    });
  }
};

module.exports = { getMainPage, getConnected };
