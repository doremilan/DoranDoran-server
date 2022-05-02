const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authMiddleware = require("../middlewares/authMiddleWare");

// 갤러리 앨범 생성
router.post("/:familyId", authMiddleware, async (req, res) => {
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
        msg: "새로운 앨범이 생성되었어요",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "앨범 이름을 작성해주세요",
      });
    }
  } catch (error) {
    console.log("갤러리 앨범 생성 오류", error);
    res.status(400).send({
      result: false,
      msg: "갤러리 앨범 생성 실패",
    });
  }
});

// 갤러리 앨범 목록 조회
router.get("/:familyId", authMiddleware, async (req, res) => {
  const { familyId } = req.params;

  try {
    const [photoAlbumList] = await PhotoAlbum.find({ familyId });
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
});

module.exports = router;
