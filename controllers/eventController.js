const Event = require("../schemas/event");
const Photo = require("../schemas/photo");

//일정 작성
const createEvent = async (req, res) => {

  // const { userId } = res.locals.user;
  //console.log(userId)
  const { familyId } = req.params;
  const { userId, event, startDate, endDate, color } = req.body;
  // console.log(familyId)
  // console.log(req.body)
  try {
    const addEvent = await Event.create({
      userId,
      familyId,
      event,
      startDate,
      endDate,
      color,
    });
    console.log(addEvent)
    res.status(201).json({
      addEvent,
      msg: "일정 등록 완료",
    });
  } catch (error) {
    res.status(400).send({
      msg: "에러"
    })
    console.log(error)
  }
};


//일정 수정
const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { event, startDate, endDate, color } = req.body;

  const putEvent = Event.findOne({ eventId });
  if (!putEvent) {
    return res.status(400).send({
      msg: "수정실패",
    });
  } else {
    await Event.updateOne(
      { eventId },
      {
        $set: {
          event,
          startDate,
          endDate,
          color,
        },
      }
    );
    res.status(200).json({
      msg: "수정 완료되었습니다.",
    });
  }
};



//일정 삭제
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const existtEvent = await Event.findOne({ eventId });
    if (existtEvent) {
      await Event.deleteOne({ eventId });

      res.status(204).json({
        result: true,
        msg: "삭제되었습니다.",
      });
    }
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "삭제를 실패했습니다.",
    });
  }
};


//일정 조회
const getEvent = async (req, res) => {
  const { familyId, date } = req.params;
  // const { userId } = res.locals;
  // console.log(familyId, date)
  try {
    let eventCalendarList = []
    const events = await Event.find({ familyId, date });
    const thisMonth = date.split("-")

    for (let event of events) {
      const eventDate = event.startDate.split("-", 2)
      if (thisMonth[0] === eventDate[0] && thisMonth[1] === eventDate[1]) {
        eventCalendarList.push(event)
      }
    }
    res.status(200).json({
      eventCalendarList,
    });

  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    });
  }
};

//추억 조회
const getPhotoEvent = async (req, res) => {
  const { familyId, date } = req.params;
  // const { userId } = res.locals;
  // console.log(familyId, date)
  try {
    let eventCalendarList = []
    const events = await Event.find({ familyId, date });
    const thisMonth = date.split("-")
    const photoCalendarList = await Photo.find({ familyId })

    for (let event of events) {
      const eventDate = event.startDate.split("-", 2)
      if (thisMonth[0] === eventDate[0] && thisMonth[1] === eventDate[1]) {
        eventCalendarList.push(event)
      }
    }

    res.status(200).json({
      eventCalendarList,
      photoCalendarList,
    });

  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    });
  }
};

//추억상세보기
const getPhotoEventDetail = async (req, res) => {
  const { familyId, date } = req.params;
  // const { userId } = res.locals;
  // console.log(familyId, date)
  try {
    let photoModalList = []
    const photos = await Photo.find({ familyId, date });
    console.log(photos)



    res.status(200).json({
      photoModalList
    });

  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    });
  }
};
module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getPhotoEvent,
  getPhotoEventDetail
};
