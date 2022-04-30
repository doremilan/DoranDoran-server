const User = require("../schemas/user");
const PhotoAlbum = require("../schemas/photoAlbum");
const Photo = require("../schemas/photo");
const Comment = require("../schemas/comment");
const Like = require("../schemas/like");

// 갤러리 앨범생성
export async function postPhotoAlbums(req, res) {
  const { familyId } = req.params;
  const { userId } = res.locals.user;
  const { photoAlbumName } = req.body;
  const createdAt = new Date();

  try {
    if (photoAlbumName !== null) {
      const createdPhotoAlbum = await PhotoAlbum.create({
        familyId,
        userId,
        photoAlbumName,
        createdAt,
      });
      const newPhotoAlbumId = await PhotoAlbum.find({
        _id: createdPhotoAlbum._id,
      });
      res.status(201).json({
        newPhotoAlbumId,
        msg: "새로운 앨범이 생성되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "앨범 이름을 작성해주세요.",
      });
    }
  } catch (error) {
    console.log("갤러리 앨범 생성 오류", error);
    res.status(400).send({
      result: false,
      msg: "갤러리 앨범 생성 실패",
    });
  }
}

// 갤러리 앨범조회
export async function getPhotoAlbums(req, res) {
  const { familyId } = req.params;

  try {
    const [photoAlbumList] = await PhotoAlbum.find({ familyId }).sort(
      "-createdAt"
    );

    // 확인필요
    // let newPhotoAlbum = [];
    // photoAlbumList.map((list, idx) => {
    //   return newPhotoAlbum.push(list.photoAlbumName, list.photoAlbumId);
    // });
    // console.log(newPhotoAlbum);

    res.status(200).json({
      photoAlbumList,
    });
  } catch (error) {
    console.log("갤러리 앨범 조회 오류", error);
    res.status(400).send({
      result: false,
      msg: "갤러리 앨범 조회 실패",
    });
  }
}

// 갤러리 앨범수정
export async function patchPhotoAlbums(req, res) {
  const { photoAlbumId } = req.params;
  const { photoAlbumName } = req.body;

  try {
    if (photoAlbumName !== null) {
      const existPhotoAlbum = await PhotoAlbum.findOne({ photoAlbumId });
      if (existPhotoAlbum) {
        await PhotoAlbum.updateOne(
          { photoAlbumId },
          { $set: { photoAlbumName } }
        );
        res.status(200).json({
          photoAlbumName,
          msg: "앨범이 수정되었어요.",
        });
      }
    } else {
      res.status(400).send({
        result: false,
        msg: "앨범 이름을 작성해주세요.",
      });
    }
  } catch (error) {
    console.log("갤러리 앨범 수정 오류", error);
    res.status(400).send({
      result: false,
      msg: "갤러리 앨범 수정 실패",
    });
  }
}

// 갤러리 앨범삭제
export async function deletePhotoAlbums(req, res) {
  const { photoAlbumId } = req.params;

  try {
    const existPhotoAlbum = await PhotoAlbum.findOne({ photoAlbumId });
    if (existPhotoAlbum) {
      await PhotoAlbum.deleteOne({ photoAlbumId });
      await Photo.deleteMany({ photoAlbumId });
      await Comment.deleteMany({ photoAlbumId });
      await Like.deleteMany({ photoAlbumId });
      res.status(204).json({
        result: true,
        msg: "앨범이 삭제되었어요.",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "갤러리 앨범 삭제 실패",
      });
    }
  } catch (error) {
    console.log("갤러리 앨범 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "갤러리 앨범 삭제 실패",
    });
  }
}
