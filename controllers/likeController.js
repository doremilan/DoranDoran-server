// const Like = require("../schemas/like");

// // 좋아요
// const postLike = async (req, res) => {
//   const { photoId } = req.params;
//   const { userId } = res.locals.user;
//   const { likeChk } = req.body;

//   try {
//     if (likeChk) {
//       await Photo.updateOne({ photoId }, { $inc: { totalLike: -1 } });
//       await Like.deleteOne({ photoId, userId });
//       let likeChk = false;
//       res.status(200).json({
//         likeChk,
//       });
//     } else {
//       await Photo.updateOne({ photoId }, { $inc: { totalLike: 1 } });
//       await Like.create({ photoId, userId });
//       let likeChk = true;
//       res.status(200).json({
//         likeChk,
//       });
//     }
//   } catch (error) {
//     console.log("좋아요 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "좋아요 실패",
//     });
//   }
// };
