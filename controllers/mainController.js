const User = require('../schemas/user');
const Family = require('../schemas/family');
const FamilyMember = require('../schemas/familyMember');
const Mission = require('../schemas/mission');
const MissionMember = require('../schemas/missionmember');
const MissionChk = require('../schemas/missionChk');
const Badge = require('../schemas/badge');
const Photo = require('../schemas/photo');
const VoiceFile = require('../schemas/voiceFile');
const Comment = require('../schemas/comment');
const Event = require('../schemas/event');
const RandomMsg = require('../schemas/randomMsg');

// 메인화면 조회
const getMainPage = async (req, res) => {
  const { familyId } = req.params;
  // const { userId } = res.locals.user;
  const { userId } = req.body;

  try {
    // 랜덤메시지 랜덤추출
    const randomMsg = await RandomMsg.aggregate([{ $sample: { size: 1 } }]);
    // 유저정보 추출
    const userInfo = await User.findOne({ _id: userId });
    // 가족정보 추출
    const familyInfo = await Family.findOne({ _id: familyId });
    // 가족 멤버리스트 추출
    const familyMemberList = await FamilyMember.find({ familyId });
    // 최신사진 추출
    const photos = await Photo.find({ familyId }).sort('-createdAt');
    const recentPhoto = photos[0];
    // 최신음성메시지 추출
    const voiceFiles = await VoiceFile.find({ familyId }).sort('-createdAt');
    const recentVoiceFile = voiceFiles[0];
    // 이번달 일정 추출
    const thisMonth = new Date()
      .toISOString()
      .substring(0, 7)
      .replace(/-/g, '');
    const thisMonthEventList = [];
    const events = await Event.find({ familyId }).sort('-createdAt');
    for (let event of events) {
      if (event.startDate.split('-').splice(0, 2).join('') === thisMonth) {
        thisMonthEventList.push(event);
      }
    }
    // 이번달 미션 달성률 계산
    const missions = await Mission.find({ familyId }).sort('-createdAt');
    // 이번달 미션 리스트 추출 & 전체 미션 수 계산
    const thisMonthMissionList = [];
    let totalMission = 0;
    for (let mission of missions) {
      if (
        mission.createdAt.toISOString().substring(0, 7).replace(/-/g, '') ===
        thisMonth
      ) {
        thisMonthMissionList.push(mission);
        totalMission++;
      }
    }
    const recentMission = thisMonthMissionList[0];
    // 각 미션의 멤버 리스트 추출 후 달성 완료된 미션 수 계산
    let completedMission = 0;
    for (let mission of thisMonthMissionList) {
      const missionMembers = await MissionMember.find({
        missionId: mission.missionId,
      });
      const completedMembers = await MissionChk.find({
        missionId: mission.missionId,
      });
      if (missionMembers.length === completedMembers.length) {
        completedMission++;
      }
    }

    // 미션 달성률 계산
    const Percentage = (completedMission / totalMission) * 100;
    let completePercentage = Math.floor(Percentage);
    // NaN일 경우 예외처리 (0으로 반환)
    if (!Percentage) {
      completePercentage = 0;
    }

    // 획득배지 랜덤추출
    const badgeList = await Badge.findOne({ familyId });
    const badges = badgeList.badge;
    let checkedbadges = [];
    for (let badge of badges) {
      // 1번 배지 획득 여부체크
      if (badge.badgeTitle === '단란한 시작') {
        checkedbadges.push(badge);
      }
      // 2번 배지 획득 여부 체크
      if (badge.badgeTitle === '추억의 발자국') {
        const existPhoto = await Photo.find({ familyId });
        if (existPhoto.length >= 15) {
          checkedbadges.push(badge);
        }
      }
      // 3번 배지 획득 여부 체크
      if (badge.badgeTitle === '정겨운 목소리') {
        const existVoiceFile = await VoiceFile.find({ familyId });
        if (existVoiceFile.length >= 10) {
          checkedbadges.push(badge);
        }
      }
      // 4번 배지 획득 여부 체크
      if (badge.badgeTitle === '협동의 즐거움') {
        const existMission = await Mission.find({ familyId });
        if (existMission.length >= 20) {
          checkedbadges.push(badge);
        }
      }
      // 5번 배지 획득 여부 체크
      if (badge.badgeTitle === '소통의 기쁨') {
        const existComment = await Comment.find({ familyId });
        if (existComment.length >= 50) {
          checkedbadges.push(badge);
        }
      }
      // 6번 배지 획득 여부 체크
      if (badge.badgeTitle === '함께하는 나날') {
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
      familyMemberList,
      completePercentage,
      recentPhoto,
      recentVoiceFile,
      thisMonthEventList,
      recentMission,
      randomBadge,
    });
  } catch (error) {
    console.log('메인화면 조회 오류', error);
    res.status(400).send({
      result: false,
      msg: '메인화면 조회 실패',
    });
  }
};

module.exports = { getMainPage };
