// const User = require("../schemas/user");
// const FamilyMember = require("../schemas/familyMember");
// const PhotoAlbum = require("../schemas/photoAlbum");
// const Photo = require("../schemas/photo");
// const Comment = require("../schemas/comment");
// const Like = require("../schemas/like");

// // 앨범생성
// const postPhotoAlbums = async (req, res) => {
//   const { familyId } = req.params;
//   const { userId } = res.locals.user;
//   const { photoAlbumName } = req.body;
//   const createdAt = new Date();

//   try {
//     // 공백 체크
//     if (photoAlbumName !== null && photoAlbumName !== "") {
//       const createdPhotoAlbum = await PhotoAlbum.create({
//         familyId,
//         userId,
//         photoAlbumName,
//         createdAt,
//       });
//       const newPhotoAlbumId = await PhotoAlbum.findOne({
//         _id: createdPhotoAlbum._id,
//       });
//       res.status(201).json({
//         newPhotoAlbumId,
//         msg: "새로운 앨범이 생성되었어요.",
//       });
//     } else {
//       res.status(400).send({
//         result: false,
//         msg: "앨범 이름을 작성해주세요.",
//       });
//     }
//   } catch (error) {
//     console.log("갤러리 앨범 생성 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "갤러리 앨범 생성 실패",
//     });
//   }
// };

// // 앨범조회
// const getPhotoAlbums = async (req, res) => {
//   const { familyId } = req.params;

//   try {
//     const [photoAlbumList] = await PhotoAlbum.find({ familyId }).sort(
//       "-createdAt"
//     );

//     // 확인필요
//     // let newPhotoAlbum = [];
//     // photoAlbumList.map((list, idx) => {
//     //   return newPhotoAlbum.push(list.photoAlbumName, list.photoAlbumId);
//     // });
//     // console.log(newPhotoAlbum);

//     res.status(200).json({
//       photoAlbumList,
//     });
//   } catch (error) {
//     console.log("갤러리 앨범 조회 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "갤러리 앨범 조회 실패",
//     });
//   }
// };

// // 앨범수정
// const putPhotoAlbums = async (req, res) => {
//   const { photoAlbumId } = req.params;
//   const { photoAlbumName } = req.body;

//   try {
//     // 공백 체크
//     if (photoAlbumName !== null && photoAlbumName !== "") {
//       const existPhotoAlbum = await PhotoAlbum.findOne({ photoAlbumId });
//       if (existPhotoAlbum) {
//         await PhotoAlbum.updateOne(
//           { photoAlbumId },
//           { $set: { photoAlbumName } }
//         );
//         res.status(200).json({
//           photoAlbumName,
//           msg: "앨범이 수정되었어요.",
//         });
//       }
//     } else {
//       res.status(400).send({
//         result: false,
//         msg: "앨범 이름을 작성해주세요.",
//       });
//     }
//   } catch (error) {
//     console.log("갤러리 앨범 수정 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "갤러리 앨범 수정 실패",
//     });
//   }
// };

// // 앨범삭제
// const deletePhotoAlbums = async (req, res) => {
//   const { photoAlbumId } = req.params;

//   try {
//     const existPhotoAlbum = await PhotoAlbum.findOne({ photoAlbumId });
//     // 앨범, 사진, 댓글, 좋아요 모두 삭제
//     if (existPhotoAlbum) {
//       await PhotoAlbum.deleteOne({ photoAlbumId });
//       await Photo.deleteMany({ photoAlbumId });
//       await Comment.deleteMany({ photoAlbumId });
//       await Like.deleteMany({ photoAlbumId });
//       res.status(204).json({
//         result: true,
//         msg: "앨범이 삭제되었어요.",
//       });
//     }
//   } catch (error) {
//     console.log("갤러리 앨범 삭제 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "갤러리 앨범 삭제 실패",
//     });
//   }
// };

// // 사진생성
// const postPhoto = async (req, res) => {
//   const { familyId, photoAlbumId } = req.params;
//   const { userId } = res.locals.user;
//   const { photoName, content } = req.body;
//   const photoFile = req.files.photoFile[0].location; //업로드 미들웨어 확인필요
//   const createdAt = new Date();

//   try {
//     // 공백 체크
//     if (
//       photoName !== null &&
//       photoName !== "" &&
//       content !== null &&
//       content !== "" &&
//       photoFile !== null
//     ) {
//       const createdPhoto = await Photo.create({
//         familyId,
//         userId,
//         photoName,
//         content,
//         photoFile,
//         createdAt,
//       });
//       const newPhotoId = await Photo.findById({
//         _id: createdPhoto._id,
//       });
//       res.status(201).json({
//         newPhotoId,
//         msg: "사진이 등록되었어요.",
//       });
//     } else {
//       res.status(400).send({
//         result: false,
//         msg: "공란을 작성해주세요.",
//       });
//     }
//   } catch (error) {
//     console.log("사진 등록 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "사진 등록 실패",
//     });
//   }
// };

// // 사진 목록조회
// const getPhoto = async (req, res) => {
//   const { photoAlbumId } = req.params;
//   const { userId } = res.locals.user;

//   try {
//     const [photoList] = await Photo.find({ photoAlbumId }).sort("-createdAt");
//     // 각 사진별 좋아요 체크
//     let likeChk = false;
//     let userLike = await Like.find({ userId });
//     for (let photo of photoList) {
//       if (photo.photoId === userLike.photoId) {
//         likeChk = true;
//         photo.likeChk = likeChk;
//       } else {
//         photo.likeChk = likeChk;
//       }
//     }

//     // 작성자 정보 필요여부 확인필요
//     // for (let photo of photoList) {
//     //   let userInfo = await User.findOne({ userId: photo.userId });
//     //   userInfo.userPw = "";
//     //   photo.userInfo = userInfo;
//     // }

//     res.status(200).json({
//       photoList,
//     });
//   } catch (error) {
//     console.log("사진 목록조회 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "사진 목록조회 실패",
//     });
//   }
// };

// // 사진 상세조회 & 댓글 목록조회
// const getPhotoDetail = async (req, res) => {
//   const { photoId } = req.params;
//   const { userId } = res.locals.user;

//   try {
//     const detailPhoto = await Photo.findOne({ photoId });
//     const photoUserInfo = await FamilyMember.findOne({ userId });
//     if (photoUserInfo) {
//       detailPhoto.profileImg = userInfo.profileImg;
//       detailPhoto.familyMemberNickname = userInfo.familyMemberNickname;
//     }
//     // 좋아요 누른 멤버
//     const likeMember = await Like.find({ photoId });
//     const [likeMemberList] = await FamilyMember.find({
//       userId: likeMember.userId,
//     });
//     // 좋아요 체크
//     const userLike = await Like.findOne({ photoId, userId });
//     let likeChk = false;
//     if (userLike) {
//       likeChk = true;
//       detailPhoto.likeChk = likeChk;
//     } else {
//       detailPhoto.likeChk = likeChk;
//     }
//     // 댓글 목록 & 댓글 수
//     const [commentList] = await Comment.find({ photoId }).sort("-createdAt");
//     const totalComment = commentList.length;
//     for (let comment of commentList) {
//       let commentUserInfo = await FamilyMember.findOne({
//         userId: comment.userId,
//       });
//       comment.profileImg = commentUserInfo.profileImg;
//       comment.familyMemberNickname = commentUserInfo.familyMemberNickname;
//     }
//     res.status(200).json({
//       detailPhoto,
//       totalComment,
//       commentList,
//       likeMemberList,
//     });
//   } catch (error) {
//     console.log("사진 목록조회 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "사진 상세조회 실패",
//     });
//   }
// };

// // 사진수정
// const putPhoto = async (req, res) => {
//   const { photoId } = req.params;
//   const { photoName, content } = req.body;
//   const photoFile = req.files.photoFile[0].location; //업로드 미들웨어 확인필요

//   try {
//     // 공백 체크
//     if (
//       photoName !== null &&
//       photoName !== "" &&
//       content !== null &&
//       content !== "" &&
//       photoFile !== null
//     ) {
//       const existPhoto = await Photo.findOne({ photoId });
//       if (existPhoto) {
//         await Photo.updateOne(
//           { photoId },
//           { $set: { photoName, content, photoFile } }
//         );
//         res.status(200).json({
//           photoName,
//           content,
//           photoFile,
//           msg: "사진이 수정되었어요.",
//         });
//       }
//     } else {
//       res.status(400).send({
//         result: false,
//         msg: "공란을 작성해주세요.",
//       });
//     }
//   } catch (error) {
//     console.log("사진 수정 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "사진 수정 실패",
//     });
//   }
// };

// // 사진삭제
// const deletePhoto = async (req, res) => {
//   const { photoId } = req.params;

//   try {
//     const existPhoto = await PhotoAlbum.findOne({ photoId });
//     // 사진, 댓글, 좋아요 모두 삭제
//     if (existPhoto) {
//       await Photo.deleteOne({ photoId });
//       await Comment.deleteMany({ photoId });
//       await Like.deleteMany({ photoId });
//       res.status(204).json({
//         result: true,
//         msg: "사진이 삭제되었어요.",
//       });
//     }
//   } catch (error) {
//     console.log("사진 삭제 오류", error);
//     res.status(400).send({
//       result: false,
//       msg: "사진 삭제 실패",
//     });
//   }
// };

// module.exports = {
//   postPhotoAlbums,
//   getPhotoAlbums,
//   putPhotoAlbums,
//   deletePhotoAlbums,
//   postPhoto,
//   getPhoto,
//   getPhotoDetail,
//   putPhoto,
//   deletePhoto,
// };
