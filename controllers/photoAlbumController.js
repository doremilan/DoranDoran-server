const User = require('../schemas/user');
const FamilyMember = require('../schemas/familyMember');
const PhotoAlbum = require('../schemas/photoAlbum');
const Photo = require('../schemas/photo');
const Comment = require('../schemas/comment');
const Like = require('../schemas/like');

// 앨범생성
const postPhotoAlbums = async (req, res) => {
  const { familyId } = req.params;
  // const { userId } = res.locals.user;
  const { photoAlbumName, userId } = req.body;
  const createdAt = new Date();

  try {
    // 공백 체크
    if (photoAlbumName !== null && photoAlbumName !== '') {
      const createdPhotoAlbum = await PhotoAlbum.create({
        familyId,
        userId,
        photoAlbumName,
        createdAt,
      });
      res.status(201).json({
        photoAlbumId: createdPhotoAlbum.photoAlbumId,
        msg: '새로운 앨범이 생성되었어요.',
      });
    } else {
      res.status(400).send({
        result: false,
        msg: '앨범 이름을 작성해주세요.',
      });
    }
  } catch (error) {
    console.log('갤러리 앨범 생성 오류', error);
    res.status(400).send({
      result: false,
      msg: '갤러리 앨범 생성 실패',
    });
  }
};

// 앨범조회
const getPhotoAlbums = async (req, res) => {
  const { familyId } = req.params;

  try {
    const photoAlbums = await PhotoAlbum.find({ familyId }).sort('-createdAt');
    //요청한 값만 추출
    let photoAlbumList = [{}];
    photoAlbums.map((list, idx) => {
      photoAlbumList[idx] = [
        {
          photoAlbumName: list.photoAlbumName,
          photoAlbumId: list.photoAlbumId,
        },
      ];
    });
    res.status(200).json({
      photoAlbumList,
    });
  } catch (error) {
    console.log('갤러리 앨범 조회 오류', error);
    res.status(400).send({
      result: false,
      msg: '갤러리 앨범 조회 실패',
    });
  }
};

// 앨범수정
const putPhotoAlbums = async (req, res) => {
  const { photoAlbumId } = req.params;
  const { photoAlbumName } = req.body;

  try {
    // 공백 체크
    if (photoAlbumName !== null && photoAlbumName !== '') {
      const existPhotoAlbum = await PhotoAlbum.findOne({ _id: photoAlbumId });
      if (existPhotoAlbum) {
        await PhotoAlbum.updateOne(
          { _id: photoAlbumId },
          { $set: { photoAlbumName } }
        );
        res.status(200).json({
          photoAlbumName,
          msg: '앨범이 수정되었어요.',
        });
      }
    } else {
      res.status(400).send({
        result: false,
        msg: '앨범 이름을 작성해주세요.',
      });
    }
  } catch (error) {
    console.log('갤러리 앨범 수정 오류', error);
    res.status(400).send({
      result: false,
      msg: '갤러리 앨범 수정 실패',
    });
  }
};

// 앨범삭제
const deletePhotoAlbums = async (req, res) => {
  const { photoAlbumId } = req.params;

  try {
    const existPhotoAlbum = await PhotoAlbum.findOne({ _id: photoAlbumId });
    // 앨범, 사진, 댓글, 좋아요 모두 삭제
    if (existPhotoAlbum) {
      await PhotoAlbum.deleteOne({ _id: photoAlbumId });
      await Photo.deleteMany({ _id: photoAlbumId });
      await Comment.deleteMany({ _id: photoAlbumId });
      await Like.deleteMany({ _id: photoAlbumId });
      res.status(204).json({
        result: true,
        msg: '앨범이 삭제되었어요.',
      });
    }
  } catch (error) {
    console.log('갤러리 앨범 삭제 오류', error);
    res.status(400).send({
      result: false,
      msg: '갤러리 앨범 삭제 실패',
    });
  }
};

module.exports = {
  postPhotoAlbums,
  getPhotoAlbums,
  putPhotoAlbums,
  deletePhotoAlbums,
};
