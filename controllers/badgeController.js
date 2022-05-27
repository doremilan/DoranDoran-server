const Badge = require("../schemas/badge");
const Photo = require("../schemas/photo");
const VoiceFile = require("../schemas/voiceFile");
const Mission = require("../schemas/mission");
const Comment = require("../schemas/comment");
const Event = require("../schemas/event");

// 배지조회
const getBadge = async (req, res) => {
  const { familyId } = req.params;
  try {
    const badgeList = await Badge.findOne({ familyId });
    const badges = badgeList.badge;
    // 1번 배지 상태조회
    let badgeChk = false;
    let badgeCnt = 0;
    for (let badge of badges) {
      // 자동획득 (count 생략)
      if (badge.badgeTitle === "단란한 시작") {
        badgeChk = true;
        badge.badgeChk = badgeChk;
      }
      // 2번 배지 상태조회
      if (badge.badgeTitle === "추억의 발자국") {
        const existPhoto = await Photo.find({ familyId });
        //달성 시 count 생략
        if (existPhoto.length >= 15) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
          // 달성수가 1개일 경우 예외처리
        } else if (existPhoto._id) {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = 1;
          badge.badgeCnt = badgeCnt;
        } else {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = existPhoto.length;
          badge.badgeCnt = badgeCnt;
        }
      }
      // 3번 배지 상태조회
      if (badge.badgeTitle === "정겨운 목소리") {
        const existVoiceFile = await VoiceFile.find({ familyId });
        //달성 시 count 생략
        if (existVoiceFile.length >= 10) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
          // 달성수가 1개일 경우 예외처리
        } else if (existVoiceFile._id) {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = 1;
          badge.badgeCnt = badgeCnt;
        } else {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = existVoiceFile.length;
          badge.badgeCnt = badgeCnt;
        }
      }
      // 4번 배지 상태조회
      if (badge.badgeTitle === "협동의 즐거움") {
        const existMission = await Mission.find({ familyId });
        //달성 시 count 생략
        if (existMission.length >= 20) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
          // 달성수가 1개일 경우 예외처리
        } else if (existMission._id) {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = 1;
          badge.badgeCnt = badgeCnt;
        } else {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = existMission.length;
          badge.badgeCnt = badgeCnt;
        }
      }
      // 5번 배지 상태조회
      if (badge.badgeTitle === "소통의 기쁨") {
        const existComment = await Comment.find({ familyId });
        //달성 시 count 생략
        if (existComment.length >= 50) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
          // 달성수가 1개일 경우 예외처리
        } else if (existComment._id) {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = 1;
          badge.badgeCnt = badgeCnt;
        } else {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = existComment.length;
          badge.badgeCnt = badgeCnt;
        }
      }
      // 6번 배지 상태조회
      if (badge.badgeTitle === "함께하는 나날") {
        const existEvent = await Event.find({ familyId });
        //달성 시 count 생략
        if (existEvent.length >= 5) {
          badgeChk = true;
          badge.badgeChk = badgeChk;
          // 달성수가 1개일 경우 예외처리
        } else if (existEvent._id) {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = 1;
          badge.badgeCnt = badgeCnt;
        } else {
          badgeChk = false;
          badge.badgeChk = badgeChk;
          badgeCnt = existEvent.length;
          badge.badgeCnt = badgeCnt;
        }
      }
    }
    res.status(200).json({
      badgeList,
    });
  } catch (error) {
    console.log("배지 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "배지 조회 실패",
    });
  }
};

module.exports = {
  getBadge,
};
