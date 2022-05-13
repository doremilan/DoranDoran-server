const Event = require("../schemas/event")
const Photo = require("../schemas/photo")
const User = require("../schemas/user")
const FamilyMember = require("../schemas/familyMember")

//일정 작성
const createEvent = async (req, res) => {
  const { userId } = res.locals.user
  const { familyId } = req.params
  const { event, startDate, endDate, color } = req.body.data

  try {
    const addEvent = await Event.create({
      userId,
      familyId,
      event,
      startDate,
      endDate,
      color,
    })
    // console.log(addEvent)
    res.status(201).json({
      eventId: addEvent._id,
      msg: "일정 등록 완료",
    })
  } catch (error) {
    res.status(400).send({
      msg: "에러",
    })
    console.log(error)
  }
}

//일정 수정
const updateEvent = async (req, res) => {
  const { eventId } = req.params
  const { event, startDate, endDate, color } = req.body

  try {
    const putEvent = Event.findOne({ eventId })
    // console.log(putEvent)
    if (!putEvent) {
      return res.status(400).send({
        msg: "수정실패",
      })
    } else {
      await Event.updateOne(
        { _id: eventId },
        {
          $set: {
            event,
            startDate,
            endDate,
            color,
          },
        }
      )
      res.status(200).json({
        putEvent,
        msg: "수정 완료되었습니다.",
      })
    }
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "수정을 실패했습니다.",
    })
    console.log(error)
  }
}

//일정 삭제
const deleteEvent = async (req, res) => {
  const { eventId } = req.params

  try {
    const existtEvent = await Event.findOne({ eventId })
    if (existtEvent) {
      await Event.deleteOne({ _id: eventId })

      res.status(204).json({
        result: true,
        msg: "삭제되었습니다.",
      })
    }
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "삭제를 실패했습니다.",
    })
  }
}

//일정 조회
const getEvent = async (req, res) => {
  const { familyId, date } = req.params
  // const { userId } = res.locals;
  try {
    let eventCalendarList = []
    const events = await Event.find({ familyId, date })
    const thisMonth = date.split("-")
    for (let event of events) {
      const eventDate = event.startDate.split("-", 2)
      if (thisMonth[0] === eventDate[0] && thisMonth[1] === eventDate[1]) {
        eventCalendarList.push(event)
      }
      // console.log(22, eventCalendarList)
    }
    res.status(200).json({
      eventCalendarList,
    })
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    })
  }
}

//추억 조회
const getPhotoEvent = async (req, res) => {
  const { familyId, date } = req.params

  try {
    let eventCalendarList = []
    let photoCalendarList = []
    const events = await Event.find({ familyId, date })
    const photos = await Photo.find({ familyId, date })
    // const a = photos.createdAt.toISOString() // toISOString 날짜를 2022-05-11 문자열로 변환
    const thisMonth = date.split("-")

    for (let event of events) {
      const eventDate = event.startDate.split("-", 2)
      if (thisMonth[0] === eventDate[0] && thisMonth[1] === eventDate[1]) {
        eventCalendarList.push(event)
      }
    }
    for (let photo of photos) {
      const photoString = photo.createdAt
      const photoDate = photoString.split("-", 2)
      if (thisMonth[0] === photoDate[0] && thisMonth[1] === photoDate[1]) {
        photoCalendarList.push(photo)
      }
    }

    res.status(200).json({
      eventCalendarList,
      photoCalendarList,
    })
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    })
    console.log(error)
  }
}

//추억상세보기
const getPhotoEventDetail = async (req, res) => {
  const { familyId, date } = req.params

  try {
    let photoModalList = []
    const photos = await Photo.find({ familyId, date })
    const thisMonth = date.split("-")

    for (let photo of photos) {
      const photoDate = photo.createdAt.slice(0, 10).split("-")

      if (
        thisMonth[0] === photoDate[0] &&
        thisMonth[1] === photoDate[1] &&
        thisMonth[2] === photoDate[2]
      ) {
        photoModalList.push(photo)
      }
    }

    res.status(200).json({
      photoModalList,
    })
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    })
    console.log(error)
  }
}

//일정 상세보기
const getEventDetail = async (req, res) => {
  const { familyId, date, eventId } = req.params

  try {
    const event = await Event.findOne({ familyId, date, _id: eventId })
    const thisMonth = date.split("-")
    // 날짜 체크
    if (event) {
      const eventDate = event.startDate.split("-", 3)
      if (
        thisMonth[0] === eventDate[0] &&
        thisMonth[1] === eventDate[1] &&
        thisMonth[2] === eventDate[2]
      ) {
        // 작성자 정보 추출
        const userInfo = await FamilyMember.findOne({ userId: event.userId })
        const familyMemberNickname = userInfo.familyMemberNickname
        const profileImg = userInfo.profileImg
        event.familyMemberNickname = familyMemberNickname
        event.profileImg = profileImg
      }
    }
    res.status(200).json({
      event,
    })
  } catch (error) {
    res.status(400).send({
      result: false,
      msg: "일정조회 실패",
    })
    console.log(error)
  }
}

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getPhotoEvent,
  getPhotoEventDetail,
  getEventDetail,
}
