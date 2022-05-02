const User = require("../schemas/user");
const FamilyMember = require("../schemas/familyMember");
const Mission = require("../schemas/mission");
const MissionMember = require("../schemas/missionmember");
const MissionChk = require("../schemas/missionChk");

// 미션등록
export async function postMission(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  const { missionTitle, familyMemberId } = req.body;
  const createdAt = new Date();

  try {
    // 공백 체크
    if (missionTitle !== null && missionTitle !== "") {
      const createdMission = await Mission.create({
        missionTitle,
        userId,
        familyId,
        createdAt,
      });
      const MissionId = await Mission.findById({
        _id: createdMission._id,
      });
      for (let MemberId of familyMemberId) {
        await MissionMember.create({
          MemberId,
          userId,
          MissionId,
        });
      }
      res.status(201).json({
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
      msg: "미션 등록 실패",
    });
  }
}

// 미션 완료 체크
export async function completeMission(req, res) {
  const { missionId } = req.params;
  const { userId } = res.locals.user;
  const { myMissionChk, familyMissionChk, completedAt } = req.body;

  try {
    //개인미션 체크
    if (myMissionChk) {
      await MissionChk.deleteOne({ missionId, userId });
      let myMissionChk = false;
      res.status(200).json({
        myMissionChk,
        familyMissionChk,
      });
    } else {
      await MissionChk.create({ missionId, userId });
      let myMissionChk = true;
      //전체미션 체크
      const [missionMember] = await MissionMember.find({ missionId });
      const [completedMember] = await MissionChk.find({ missionId });
      if (missionMember.length === completedMember.length) {
        return (familyMissionChk = true);
      }
      res.status(200).json({
        myMissionChk,
        familyMissionChk,
        completedAt,
      });
    }
  } catch (error) {
    console.log("미션체크 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션체크 실패",
    });
  }
}

// 이번달 미션 목록조회
export async function getMission(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;

  try {
    const thisMonth = new Date().getMonth();
    const Missions = await Mission.find({ familyId }).sort("-createdAt");
    // 이번달 미션 리스트 추출
    const thisMonthMissionList = [];
    for (let mission of Missions) {
      if (mission.createdAt.getMonth() === thisMonth) {
        thisMonthMissionList.push(mission);
        // 각 미션 멤버 & 미션완료 체크
        const [completedMembers] = await MissionChk.find({
          missionId: mission.missionId,
        });
        const [missionMembers] = await MissionMember.find({
          missionId: mission.missionId,
        });
        for (let missionMember of missionMembers) {
          for (let completedMember of completedMembers) {
            if (missionMember === completedMember) {
              let myMissionChk = true;
              missionMember.myMissionChk = myMissionChk;
            }
          }
        }
        mission.missionMemberList = missionMembers; //배열체크
        // 각 미션 전체 달성완료 체크
        if (missionMembers.length === completedMembers.length) {
          let familyMissionChk = true;
          mission.familyMissionChk = familyMissionChk;
        }
      }
    }
    res.status(200).json({
      thisMonthMissionList,
    });
  } catch (error) {
    console.log("사진 목록조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 상세조회 실패",
    });
  }
}
