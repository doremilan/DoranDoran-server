const LandomMsg = require('../schemas/randomMsg');

// 랜덤메시지 작성(내부용)
const postLandomMsg = async (req, res) => {
  const { randomMsg } = req.body;
  const createdAt = new Date();

  try {
    // 공백 체크
    if (randomMsg !== null && randomMsg !== '') {
      await LandomMsg.create({
        randomMsg,
        createdAt,
      });
      res.status(201).json({
        msg: '랜덤메시지 등록완료',
      });
    } else {
      res.status(400).send({
        result: false,
        msg: '내용을 입력해주세요.',
      });
    }
  } catch (error) {
    console.log('랜덤메시지 등록 오류', error);
    res.status(400).send({
      result: false,
      msg: '랜덤메시지 등록 실패',
    });
  }
};

// 랜덤메시지 삭제(내부용)
const deleteLandomMsg = async (req, res) => {
  const { landomMsgId } = req.params;

  try {
    const existLandomMsg = await LandomMsg.findOne({ _id: landomMsgId });
    if (existLandomMsg) {
      await LandomMsg.deleteOne({ _id: landomMsgId });
      res.status(204).json({});
    }
  } catch (error) {
    console.log('랜덤메시지 삭제 오류', error);
    res.status(400).send({
      result: false,
      msg: '랜덤메시지 삭제 실패',
    });
  }
};

module.exports = {
  postLandomMsg,
  deleteLandomMsg,
};
