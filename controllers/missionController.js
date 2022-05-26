const FamilyMember = require("../schemas/familyMember");
const Mission = require("../schemas/mission");
const MissionMember = require("../schemas/missionMember");
const MissionChk = require("../schemas/missionChk");
const Badge = require("../schemas/badge");
const Photo = require("../schemas/photo");
const VoiceFile = require("../schemas/voiceFile");
const Comment = require("../schemas/comment");
const Event = require("../schemas/event");
const User = require("../schemas/user");

// 미션등록
const postMission = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  const { missionTitle, familyMemberId } = req.body;
  console.log(missionTitle, familyMemberId);
  const createdAt = new Date();
  try {
    // 공백 체크 & 미션 db 생성
    if (missionTitle !== null && missionTitle !== "") {
      const createdMission = await Mission.create({
        missionTitle,
        userId,
        familyId,
        createdAt,
        completedAt: null,
      });
      // 미션 멤버 db 생성
      let createdMember = [];
      if (familyMemberId) {
        for (let MemberId of familyMemberId) {
          const familyMemberId = MemberId.familyMemberId;
          const missionMember = await FamilyMember.findOne({
            _id: familyMemberId,
          });
          const userId = missionMember.userId;
          const familyMemberNickname = missionMember.familyMemberNickname;
          if (missionMember.profileImg !== null) {
            profileImg = missionMember.profileImg;
          } else {
            profileImg = null;
          }
          // 공백 체크
          if (missionMember) {
            const newMember = await MissionMember.create({
              familyId,
              missionId: createdMission.missionId,
              familyMemberId,
              familyMemberNickname,
              profileImg,
              userId,
            });
            createdMember.push(newMember);
          }
        }
      } else {
        res.status(400).send({
          result: false,
          msg: "미션 멤버를 등록해주세요.",
        });
      }
      const userInfo = await FamilyMember.findOne({ userId });
      const userFamilyName = userInfo.familyMemberNickname;
      res.status(201).json({
        missionId: createdMission.missionId,
        createdMember,
        msg: "새로운 미션이 등록되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "미션 제목을 작성해주세요.",
      });
    }
  } catch (error) {
    console.log("미션 등록 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션 멤버를 확인해주세요.",
    });
  }
};

// 미션 완료 체크
const completeMission = async (req, res) => {
  const { familyId, missionId } = req.params;
  const { userId } = res.locals.user;
  const { completedAt } = req.body;
  let { myMissionChk } = req.body;
  try {
    const memberChk = await MissionMember.findOne({ userId, missionId });
    if (memberChk) {
      //개인미션 체크
      if (myMissionChk) {
        const familyMemberId = await FamilyMember.findOne({ familyId, userId });
        const missionChk = await MissionChk.create({
          familyId,
          missionId,
          userId,
          familyMemberId: familyMemberId.familyMemberId,
        });
        let myMissionChk = true;
        //전체미션 체크 & 미션 달성완료 시간 저장
        const missionMember = await MissionMember.find({ missionId });
        const completedMember = await MissionChk.find({ missionId });
        let familyMissionChk = false;
        if (missionMember.length === completedMember.length) {
          familyMissionChk = true;
          await Mission.updateOne(
            { _id: missionId },
            { $set: { completedAt } }
          );
          const mission = await Mission.findOne({ _id: missionId });
        }
        res.status(200).json({
          myMissionChk,
          familyMissionChk,
          completedAt,
        });
      } else {
        await MissionChk.deleteOne({ missionId, userId });
        myMissionChk = false;
        familyMissionChk = false;
        res.status(200).json({
          myMissionChk,
          familyMissionChk,
          completedAt,
        });
      }
    } else {
      res.status(400).send({
        result: false,
        msg: "해당 미션의 멤버가 아니에요!",
      });
    }
  } catch (error) {
    console.log("미션체크 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션체크 실패",
    });
  }
};

// 미션 현황 대시보드 조회
const getDashboard = async (req, res) => {
  const { familyId } = req.params;
  try {
    // 이번달 전체 미션 수 추출
    const thisMonth = new Date()
      .toISOString()
      .substring(0, 7)
      .replace(/-/g, "");
    const missions = await Mission.find({ familyId }).sort("-createdAt");
    let totalMission = 0;
    let completedMission = 0;
    if (missions.length) {
      for (let mission of missions) {
        if (
          mission.createdAt.toISOString().substring(0, 7).replace(/-/g, "") ===
          thisMonth
        ) {
          totalMission += 1;
          // 각 미션 전체 달성완료 여부 체크 & 완료된 미션 수 추출
          const completedMembers = await MissionChk.find({
            missionId: mission.missionId,
          });
          const missionMembers = await MissionMember.find({
            missionId: mission.missionId,
          });
          if (missionMembers.length !== 0) {
            if (missionMembers.length === completedMembers.length) {
              completedMission += 1;
            }
          }
        }
      }
    }
    // 미션 달성률 계산
    const Percentage = (completedMission / totalMission) * 100;
    let completePercentage = Math.floor(Percentage);
    // NaN일 경우 예외처리 (0으로 반환)
    if (!Percentage) {
      completePercentage = 0;
    }
    // 총 배지 획득 수 조회
    const badgeList = await Badge.findOne({ familyId });
    // console.log(badgeList);
    const badges = badgeList.badge;
    let totalBadge = 0;
    for (let badge of badges) {
      //1번 배지 상태조회
      if (badge.badgeTitle === "단란한 시작") {
        totalBadge++;
      }
      // 2번 배지 상태조회
      if (badge.badgeTitle === "추억의 발자국") {
        const existPhoto = await Photo.find({ familyId });
        if (existPhoto.length >= 15) {
          totalBadge++;
        }
      }
      // 3번 배지 상태조회
      if (badge.badgeTitle === "정겨운 목소리") {
        const existVoiceFile = await VoiceFile.find({ familyId });
        if (existVoiceFile.length >= 10) {
          totalBadge++;
        }
      }
      // 4번 배지 상태조회
      if (badge.badgeTitle === "협동의 즐거움") {
        const existMission = await Mission.find({ familyId });
        if (existMission.length >= 20) {
          totalBadge++;
        }
      }
      // 5번 배지 상태조회
      if (badge.badgeTitle === "소통의 기쁨") {
        const existComment = await Comment.find({ familyId });
        if (existComment.length >= 50) {
          totalBadge++;
        }
      }
      // 6번 배지 상태조회
      if (badge.badgeTitle === "함께하는 나날") {
        const existEvent = await Event.find({ familyId });
        if (existEvent.length >= 5) {
          totalBadge++;
        }
      }
    }
    res.status(200).json({
      totalMission,
      completedMission,
      completePercentage,
      totalBadge,
    });
  } catch (error) {
    console.log("미션현황 대시보드 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션현황 대시보드 조회 실패",
    });
  }
};

// 이번달 미션 목록조회
const getMission = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  try {
    // 이번달 미션 리스트 추출
    const thisMonth = new Date()
      .toISOString()
      .substring(0, 7)
      .replace(/-/g, "");
    const missions = await Mission.find({ familyId }).sort("-createdAt");
    const thisMonthMissionList = [];
    if (missions.length) {
      for (let mission of missions) {
        if (
          mission.createdAt.toISOString().substring(0, 7).replace(/-/g, "") ===
          thisMonth
        ) {
          thisMonthMissionList.push(mission);
        }
      }
    }
    // 각 미션의 멤버 리스트 추출
    if (thisMonthMissionList.length) {
      for (let mission of thisMonthMissionList) {
        const missionMembers = await MissionMember.find({
          missionId: mission.missionId,
        });
        mission.missionMemberList = missionMembers;
        for (let missionMember of missionMembers) {
          mission.myMissionChk = false;
        }
        // 해당 유저의 각 미션 달성 여부 체크
        const completedMembers = await MissionChk.find({
          missionId: mission.missionId,
        });
        const checkMemberId = await FamilyMember.findOne({
          familyId,
          userId,
        });
        for (let completedMember of completedMembers) {
          if (completedMember.familyMemberId === checkMemberId.familyMemberId) {
            mission.myMissionChk = true;
          }
        }
        // 각 미션 전체 달성완료 여부 체크 & 완료된 미션 수 추출
        let familyMissionChk = false;
        if (missionMembers.length === completedMembers.length) {
          familyMissionChk = true;
          mission.familyMissionChk = familyMissionChk;
        } else {
          familyMissionChk = false;
          mission.familyMissionChk = familyMissionChk;
        }
        // 각 멤버의 미션완료 여부 체크
        let myMissionChk = false;
        // 완료멤버가 없을 시 예외처리 (빈 객체 속성을 배열로 바꿔서 체크)
        if (Object.keys(completedMembers).length === 0) {
          missionMembers.map((missionMember) => {
            myMissionChk = false;
            missionMember.myMissionChk = myMissionChk;
          });
        }
        missionMembers.filter((missionMember) => {
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
    res.status(200).json({
      thisMonthMissionList,
    });
  } catch (error) {
    console.log("미션 목록조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션 목록조회 실패",
    });
  }
};

// 지난 미션 목록조회 (추후 무한스크롤 구현 필요)
const getPastMission = async (req, res) => {
  const { familyId } = req.params;
  try {
    // 지난미션 리스트 조회
    const thisMonth = new Date()
      .toISOString()
      .substring(0, 7)
      .replace(/-/g, "");
    const missions = await Mission.find({ familyId }).sort("-createdAt");
    const pastMissionList = [];
    if (missions.length) {
      for (let mission of missions) {
        if (
          mission.createdAt.toISOString().substring(0, 7).replace(/-/g, "") !==
          thisMonth
        ) {
          pastMissionList.push(mission);
        }
      }
    }
    // 각 미션의 멤버 리스트 추출
    if (pastMissionList.length) {
      for (let mission of pastMissionList) {
        const missionMembers = await MissionMember.find({
          missionId: mission.missionId,
        });
        const completedMembers = await MissionChk.find({
          missionId: mission.missionId,
        });
        mission.missionMemberList = missionMembers;
        // 각 미션 전체 달성완료 여부 체크
        let familyMissionChk = false;
        if (missionMembers.length === completedMembers.length) {
          familyMissionChk = true;
          mission.familyMissionChk = familyMissionChk;
        } else {
          familyMissionChk = false;
          mission.familyMissionChk = familyMissionChk;
        }
        // 각 멤버의 미션완료 여부 체크
        let myMissionChk = false;
        // 완료멤버가 없을 시 예외처리 (빈 객체 속성을 배열로 바꿔서 체크)
        if (Object.keys(completedMembers).length === 0) {
          missionMembers.map((missionMember) => {
            myMissionChk = false;
            missionMember.myMissionChk = myMissionChk;
          });
        }
        missionMembers.filter((missionMember) => {
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
    res.status(200).json({
      pastMissionList,
    });
  } catch (error) {
    console.log("지난미션 목록조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "지난미션 목록조회 실패",
    });
  }
};

// 미션 멤버 목록조회(멤버추가 시 사용)
const getfamilyMemberList = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  try {
    const familyMemberList = await FamilyMember.find({ familyId });
    const userInfo = await User.findOne({ _id: userId });
    res.status(200).json({
      userInfo,
      familyMemberList,
    });
  } catch (error) {
    console.log("멤버 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "멤버 조회 실패",
    });
  }
};

// 미션삭제
const deleteMission = async (req, res) => {
  const { missionId } = req.params;
  try {
    const existMission = await Mission.findOne({ _id: missionId });
    // 미션, 미션멤버, 미션체크 모두 삭제
    if (existMission) {
      await Mission.deleteOne({ _id: missionId });
      await MissionMember.deleteMany({ _id: missionId });
      await MissionChk.deleteMany({ _id: missionId });
      res.status(200).json({
        result: true,
        msg: "미션이 삭제되었어요!",
      });
    }
  } catch (error) {
    console.log("미션 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션 삭제 실패",
    });
  }
};

module.exports = {
  postMission,
  completeMission,
  getMission,
  getDashboard,
  getPastMission,
  getfamilyMemberList,
  deleteMission,
};
