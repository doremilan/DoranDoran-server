const FamilyMember = require("../schemas/familyMember");
const PhotoAlbum = require("../schemas/photoAlbum");
const Photo = require("../schemas/photo");
const Comment = require("../schemas/comment");
const Like = require("../schemas/like");

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

// 사진생성
const postPhoto = async (req, res) => {
  const { familyId, photoAlbumId } = req.params;
  const { userId } = res.locals.user;
  const photoFile = req.file.location;
  const createdAt = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .split("T")[0];
  try {
    // 공백 체크
    if (photoFile !== null) {
      const createdPhoto = await Photo.create({
        familyId,
        photoAlbumId,
        userId,
        photoFile,
        createdAt,
      });
      res.status(201).json({
        photoId: createdPhoto.photoId,
        createdPhoto,
        msg: "사진이 등록되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "사진을 업로드해주세요.",
      });
    }
  } catch (error) {
    console.log("사진 등록 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 등록 실패",
    });
  }
};

// 사진 목록조회 (무한스크롤 적용)
const getPhotos = async (req, res) => {
  const { photoAlbumId, pageNum } = req.params;
  try {
    const photoList = await Photo.find({ photoAlbumId })
      .sort({ $natural: -1 })
      .skip((pageNum - 1) * 14)
      .limit(14);
    const photoAlbum = await PhotoAlbum.findOne({ _id: photoAlbumId });
    const PhotoAlbumName = photoAlbum.photoAlbumName;
    res.status(200).json({
      PhotoAlbumName,
      photoList,
    });
  } catch (error) {
    console.log("사진 목록조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 목록조회 실패",
    });
  }
};

// 사진 상세조회 & 댓글 목록조회
const getPhotoDetail = async (req, res) => {
  const { familyId, photoId } = req.params;
  const { userId } = res.locals.user;
  try {
    // 사진 등록한 유저 정보 추출
    const detailPhoto = await Photo.findOne({ _id: photoId });
    const photoAlbum = await PhotoAlbum.findOne({
      _id: detailPhoto.photoAlbumId,
    });
    const PhotoAlbumName = photoAlbum.photoAlbumName;
    if (detailPhoto) {
      const userInfo = await FamilyMember.findOne({
        familyId,
        userId: detailPhoto.userId,
      });
      if (!userInfo.profileImg) {
        userInfo.profileImg = null;
      }
      detailPhoto.userInfo = userInfo;
    }
    // 댓글 목록 & 댓글 수
    const commentList = await Comment.find({ photoId });
    const totalComment = commentList.length;
    if (commentList.length) {
      for (let comment of commentList) {
        const userInfo = await FamilyMember.findOne({
          familyId,
          userId: comment.userId,
        });
        if (!userInfo.profileImg) {
          userInfo.profileImg = null;
        }
        comment.userInfo = userInfo;
      }
    }
    // 좋아요 누른 멤버
    let likeMemberList = [];
    const likedMembers = await Like.find({ photoId });
    if (!likedMembers) {
      likeMemberList = [];
    } else {
      for (let likedMember of likedMembers) {
        const likeMember = await FamilyMember.findOne({
          userId: likedMember.userId,
          familyId,
        });
        likeMemberList.push(likeMember);
      }
    }
    // 좋아요 체크
    const userLike = await Like.findOne({ photoId, userId });
    let likeChk = false;
    if (userLike) {
      likeChk = true;
    }
    res.status(200).json({
      PhotoAlbumName,
      detailPhoto,
      likeChk,
      totalComment,
      commentList,
      likeMemberList,
    });
  } catch (error) {
    console.log("사진 상세조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 상세조회 실패",
    });
  }
};

// 사진수정
const putPhoto = async (req, res) => {
  const { photoId } = req.params;
  const photoFile = req.file.location;
  try {
    // 공백 체크
    if (photoFile !== null) {
      const existPhoto = await Photo.findOne({ _id: photoId });
      if (existPhoto) {
        await Photo.updateOne({ _id: photoId }, { $set: { photoFile } });
        res.status(200).json({
          photoFile,
          msg: "사진이 수정되었어요.",
        });
      }
    } else {
      res.status(400).send({
        result: false,
        msg: "사진을 등록해주세요.",
      });
    }
  } catch (error) {
    console.log("사진 수정 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 수정 실패",
    });
  }
};

// 사진삭제
const deletePhoto = async (req, res) => {
  const { photoId } = req.params;
  try {
    const existPhoto = await Photo.findOne({ _id: photoId });
    // 사진, 댓글, 좋아요 모두 삭제
    if (existPhoto) {
      await Photo.deleteOne({ _id: photoId });
      await Comment.deleteMany({ photoId });
      await Like.deleteMany({ photoId });
      const photoFileURL = existPhoto.photoFile;
      const deletephotoFile = photoFileURL.split("/")[4];
      const key1 = "photo/" + decodeURI(deletephotoFile).replaceAll("+", " ");
      s3.deleteObject(
        {
          Bucket: "family-8",
          Key: key1,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );
      res.status(200).json({
        result: true,
        msg: "사진이 삭제되었어요.",
      });
    }
  } catch (error) {
    console.log("사진 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "사진 삭제 실패",
    });
  }
};

module.exports = {
  postPhoto,
  getPhotoDetail,
  putPhoto,
  deletePhoto,
  getPhotos,
};
