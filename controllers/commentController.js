const Comment = require("../schemas/comment");
const FamilyMember = require("../schemas/familyMember");

// 댓글 작성
const postComment = async (req, res) => {
  const { familyId, photoId, photoAlbumId } = req.params;
  const { userId } = res.locals.user;
  const { comment } = req.body;
  const createdAt = new Date();
  try {
    // 공백 체크
    if (comment !== null && comment !== "") {
      const createdComment = await Comment.create({
        familyId,
        photoId,
        photoAlbumId,
        userId,
        comment,
        createdAt,
      });
      // 댓글 작성자 정보 추출
      let userInfo = await FamilyMember.findOne({ familyId, userId });
      if (userInfo) {
        if (!userInfo.profileImg) {
          userInfo.profileImg = null;
        }
        createdComment.userInfo = userInfo;
      }
      res.status(201).json({
        createdComment,
        msg: "댓글이 등록되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "내용을 입력해주세요.",
      });
    }
  } catch (error) {
    console.log("댓글 등록 오류", error);
    res.status(400).send({
      result: false,
      msg: "댓글 등록 실패",
    });
  }
};

// 댓글삭제
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const existComment = await Comment.findOne({ _id: commentId });
    if (existComment) {
      await Comment.deleteOne({ _id: commentId });
      res.status(200).json({
        result: true,
        msg: "댓글이 삭제되었어요.",
      });
    }
  } catch (error) {
    console.log("댓글 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "댓글 삭제 실패",
    });
  }
};

module.exports = {
  postComment,
  deleteComment,
};
