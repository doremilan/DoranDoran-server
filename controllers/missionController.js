const User = require("../schemas/user");
const FamilyMember = require("../schemas/familyMember");
const PhotoAlbum = require("../schemas/photoAlbum");
const Photo = require("../schemas/photo");
const Mission = require("../schemas/mission");

// 미션등록
export async function postMission(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  const { missionTitle, familyMemberId, dueDate } = req.body;
  const createdAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  try {
    // 공백 체크
    if (missionTitle !== null && missionTitle !== "") {
      const createdMission = await Mission.create({
        missionTitle,
        userId,
        familyId,
        dueDate,
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

// 이번주 미션 현황 & 목록조회
export async function getMission(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;

  try {
    const Missions = await Mission.find({ familyId });

    const MissionList = await Mission.findOne({ familyId });

    if (photoUserInfo) {
      detailPhoto.profileImg = userInfo.profileImg;
      detailPhoto.familyMemberNickname = userInfo.familyMemberNickname;
    }
    // 좋아요 누른 멤버
    const likeMember = await Like.find({ photoId });
    const [likeMemberList] = await FamilyMember.find({
      userId: likeMember.userId,
    });
    // 좋아요 체크
    const userLike = await Like.findOne({ photoId, userId });
    let likeChk = false;
    if (userLike) {
      likeChk = true;
      detailPhoto.likeChk = likeChk;
    } else {
      detailPhoto.likeChk = likeChk;
    }
    // 댓글 목록 & 댓글 수
    const [commentList] = await Comment.find({ photoId });
    const totalComment = commentList.length;
    for (let comment of commentList) {
      let commentUserInfo = await FamilyMember.findOne({
        userId: comment.userId,
      });
      comment.profileImg = commentUserInfo.profileImg;
      comment.familyMemberNickname = commentUserInfo.familyMemberNickname;
    }
    res.status(200).json({
      detailPhoto,
      totalComment,
      commentList,
      likeMemberList,
    });
  } catch (error) {
    console.log("사진 목록조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 상세조회 실패",
    });
  }
}
