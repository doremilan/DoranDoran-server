const User = require("../schemas/user");
const FamilyMember = require("../schemas/familyMember");
const Mission = require("../schemas/mission");

// 미션등록
export async function postMission(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  const { missionTitle, familyMemberId } = req.body;
  const createdAt = new Date();

  try {
    // 공백 체크
    if (missionTitle !== null && missionTitle !== "") {
      await Mission.create({
        missionTitle,
        userId,
        familyId,
        createdAt,
        $push: { familyMemberId },
      });
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
  const { completedAt } = req.body;

  try {
    //개인미션 체크
    const [completedMission] = await Mission.findOne({ missionId });
    const completedMembers = completedMission["completedMemberId"];
    const missionMembers = completedMission["familyMemberId"];

    if (completedMembers.includes(userId)) {
      await Mission.updateOne(
        { missionId },
        { $pull: { completedMemberId: userId } }
      );
      let myMissionChk = false;
      let familyMissionChk = true;
      res.status(200).json({
        myMissionChk,
        familyMissionChk,
      });
    } else {
      await Mission.updateOne(
        { missionId },
        { $push: { completedMemberId: userId } }
      );
      let myMissionChk = true;
      //전체미션 체크
      if (completedMembers.length === missionMembers.length) {
        let familyMissionChk = true;
        res.status(200).json({
          myMissionChk,
          familyMissionChk,
          completedAt,
        });
      }
    }
  } catch (error) {
    console.log("미션체크 오류", error);
    res.status(400).send({
      result: false,
      msg: "미션체크 실패",
    });
  }
}

// 이번달 미션 현황 & 목록조회
export async function getMission(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;

  try {
    // 이번달 미션 목록조회
    const thisMonth = new Date().getMonth();
    const Missions = await Mission.find({ familyId }).sort("-createdAt");
    const thisMonthMissionList = [];
    const totalMission = 0;
    for (let mission of Missions) {
      if (mission.createdAt.getMonth() === thisMonth) {
        thisMonthMissionList.push(mission);
        totalMission += 1;
        if (
          mission.familyMemberId.length === mission.completedMemberId.length
        ) {
          let familyMissionChk = true;
          mission.familyMissionChk = familyMissionChk;
        }
      }
    }
    res.status(200).json({
      totalMission,

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
