// const Comment = require("../schemas/comment");

// // 댓글 작성
// const postComment = async (req, res) => {
//   const { photoId, photoAlbumId } = req.params;
//   const { userId } = res.locals.user;
//   const { comment } = req.body;
//   const createdAt = new Date();

//   try {
//     // 공백 체크
//     if (comment !== null && comment !== "") {
//       const createdComment = await Comment.create({
//         photoId,
//         photoAlbumId,
//         userId,
//         comment,
//         createdAt,
//       });
//       const newCommentId = await Comment.findOne({
//         _id: createdComment._id,
//       });
//       res.status(201).json({
//         newCommentId,
//         msg: "댓글이 등록되었어요.",
//       });
//     } else {
//       res.status(400).send({
//         result: false,
//         msg: "내용을 입력해주세요.",
//       });
//     }
//   } catch (error) {
//     console.log("댓글 등록 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "댓글 등록 실패",
//     });
//   }
// };

// // 댓글삭제
// const deleteComment = async (req, res) => {
//   const { commentId } = req.params;

//   try {
//     const existComment = await Comment.findOne({ commentId });
//     if (existComment) {
//       await Comment.deleteOne({ commentId });
//       res.status(204).json({
//         result: true,
//         msg: "댓글이 삭제되었어요.",
//       });
//     }
//   } catch (error) {
//     console.log("댓글 삭제 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "댓글 삭제 실패",
//     });
//   }
// };
