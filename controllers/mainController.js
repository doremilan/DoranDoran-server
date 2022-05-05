const FamilyMember = require('../schemas/familyMember');
const Mission = require('../schemas/mission');
const MissionMember = require('../schemas/missionmember');
const MissionChk = require('../schemas/missionChk');
const Badge = require('../schemas/badge');
const Photo = require('../schemas/photo');
const VoiceFile = require('../schemas/voiceFile');
const Comment = require('../schemas/comment');
const Event = require('../schemas/event');

//****랜덤 메시지 db 추가필요*****

// 메인화면 조회
const getMainPage = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = res.locals.user;

  try {
    res.status(200).json({
      randomMsg, //db추가필요
      userInfo,
      familyInfo, // - familyMember,
      missionStatus, // thisMonthMission,
      badge,
      photo,
      voiceFile,
      callendar, // thisMonthEvent
      // familyInfo의 배열로 속해야 하는지 체크필요
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
