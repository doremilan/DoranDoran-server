const Family = require('../schemas/family');
const Badge = require('../schemas/badge');
const Photo = require('../schemas/photo');
const VoiceFile = require('../schemas/voiceFile');
const Mission = require('../schemas/mission');
const Comment = require('../schemas/comment');
const Event = require('../schemas/event');

// 배지조회
const getBadge = async (req, res) => {
  const { familyId } = req.params;

  try {
    const badgeList = await Badge.find({ familyId });
    // 1번 배지 상태조회
    let badgeChk = false;
    for (let badge of badgeList.badge) {
      if (badge.badgeTitle === '단란한 시작') {
        const existFamily = await Family.findOne({ _id: familyId });
        if (existFamily) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
        } else {
          badge.badgeChk = badgeChk;
        }
      }
      // 2번 배지 상태조회
      if (badge.badgeTitle === '추억의 발자국') {
        const existPhoto = await Photo.findOne({ _id: familyId });
        if (existPhoto >= 15) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
        } else {
          badge.badgeChk = badgeChk;
        }
      }
      // 3번 배지 상태조회
      if (badge.badgeTitle === '정겨운 목소리') {
        const existVoiceFile = await VoiceFile.findOne({ _id: familyId });
        if (existVoiceFile >= 10) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
        } else {
          badge.badgeChk = badgeChk;
        }
      }
      // 4번 배지 상태조회
      if (badge.badgeTitle === '협동의 즐거움') {
        const existMission = await Mission.findOne({ _id: familyId });
        if (existMission >= 20) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
        } else {
          badge.badgeChk = badgeChk;
        }
      }
      // 5번 배지 상태조회
      if (badge.badgeTitle === '소통의 기쁨') {
        const existComment = await Comment.findOne({ _id: familyId });
        if (existComment >= 50) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
        } else {
          badge.badgeChk = badgeChk;
        }
      }
      // 6번 배지 상태조회
      if (badge.badgeTitle === '함께하는 나날') {
        const existEvent = await Event.findOne({ _id: familyId });
        if (existEvent >= 5) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
        } else {
          badge.badgeChk = badgeChk;
        }
      }
    }
    res.status(200).json({
      badgeList,
    });
  } catch (error) {
    console.log('배지 조회 오류', error);
    res.status(400).send({
      result: false,
      msg: '배지 조회 실패',
    });
  }
};

module.exports = {
  getBadge,
};
