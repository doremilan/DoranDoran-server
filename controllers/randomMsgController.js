const RandomMsg = require("../schemas/randomMsg");
const RandomImg = require("../schemas/randomImg");

// 랜덤메시지 작성(내부용)
const postRandomMsg = async (req, res) => {
  const { randomMsg } = req.body;
  const createdAt = new Date();

  try {
    // 공백 체크
    if (randomMsg !== null && randomMsg !== "") {
      await RandomMsg.create({
        randomMsg,
        createdAt,
      });
      res.status(201).json({
        msg: "랜덤메시지 등록완료",
      });
    } else {
      res.status(400).send({
        result: false,
        msg: "내용을 입력해주세요.",
      });
    }
  } catch (error) {
    console.log("랜덤메시지 등록 오류", error);
    res.status(400).send({
      result: false,
      msg: "랜덤메시지 등록 실패",
    });
  }
};

// 랜덤메시지 삭제(내부용)
const deleteRandomMsg = async (req, res) => {
  const { randomMsgId } = req.params;

  try {
    const existRandomMsg = await RandomMsg.findOne({ _id: randomMsgId });
    if (existRandomMsg) {
      await RandomMsg.deleteOne({ _id: randomMsgId });
      res.status(204).json({});
    }
  } catch (error) {
    console.log("랜덤메시지 삭제 오류", error);
    res.status(400).send({
      result: false,
      msg: "랜덤메시지 삭제 실패",
    });
  }
};

// 랜덤프로필 이미지 등록(내부용)
const postRandomImg = async (req, res) => {
  const { randomImg } = req.body;
  const createdAt = new Date();
  try {
    await RandomImg.create({
      randomImg,
      createdAt,
    });
    res.status(201).json({
      msg: "랜덤 프로필 이미지 등록완료",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      result: false,
      msg: "랜덤 프로필 이미지 등록 실패",
    });
  }
};

module.exports = {
  postRandomMsg,
  deleteRandomMsg,
  postRandomImg,
};
