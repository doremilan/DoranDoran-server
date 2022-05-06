// const Event = require("../schemas/event");

// //일정 작성
// const createEvent = async (req, res) => {
//   const { userId } = res.locals;
//   const { familyId } = req.params;
//   const { event, startDate, endDate, color } = req.body;

//   const createEvent = await Event.create({
//     userId,
//     familyId,
//     event,
//     startDate,
//     endDate,
//     color,
//   });

//   res.status(201).json({
//     createEvent,
//     msg: "일정 등록 완료",
//   });
// };

// //일정 수정
// const updateEvent = async (req, res) => {
//   const { eventId } = req.params;
//   const { event, startDate, endDate, color } = req.body;

//   const putEvent = Event.findOne({ eventId });
//   if (!putEvent) {
//     return res.status(400).send({
//       msg: "수정실패",
//     });
//   } else {
//     await Event.updateOne(
//       { eventId },
//       {
//         $set: {
//           event,
//           startDate,
//           endDate,
//           color,
//         },
//       }
//     );
//     res.status(200).json({
//       msg: "수정 완료되었습니다.",
//     });
//   }
// };

// //일정 삭제
// const deleteEvent = async (req, res) => {
//   const { eventId } = req.params;

//   try {
//     const existtEvent = await Event.findOne({ eventId });
//     if (existtEvent) {
//       await Event.deleteOne({ eventId });

//       res.status(204).json({
//         result: true,
//         msg: "삭제되었습니다.",
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       result: false,
//       msg: "삭제를 실패했습니다.",
//     });
//   }
// };

// // get 테스트 더미코드
// // const eventTest = [
// //     {
// //         familyId: "aabb",
// //         eventId: "asdfasdf434",
// //         event: "부모님께 연락하기",
// //         startDate: "2022-04-15 01:30",
// //         endDate: "2022-04-15 01:30",
// //         color: "red",
// //     },
// //     {
// //         familyId: "aabb",
// //         eventId: "aaaa",
// //         event: "부모님께 연sss하기",
// //         startDate: "2022-04-15 01:40",
// //         endDate: "2022-04-15 01:40",
// //         color: "red",
// //     },
// //     {
// //         familyId: "aabbcc",
// //         eventId: "aaaa",
// //         event: "부모님께 연sss하기",
// //         startDate: "2022-04-15 01:40",
// //         endDate: "2022-04-15 01:40",
// //         color: "red",
// //     },
// // ]

// //일정 조회
// const getEvent = async (req, res) => {
//   const { familyId } = req.params;
//   // const { userId } = res.locals;

//   try {
//     const [eventCalendarList] = await Event.find({ familyId });
//     console.log(eventCalendarList);

//     res.status(200).json({
//       eventCalendarList,
//     });
//   } catch (error) {
//     res.status(400).send({
//       result: false,
//       msg: "일정조회 실패",
//     });
//   }
// };
// // }

// // //추억 조회
// // const getPhotoEvent = async (req, res) => {
// //     const { familyId, startDate, endDate } = req.params;
// //     // const { userId } = res.locals;
// //     try {
// //         const [eventCalendarList] = await Event.find({
// //             familyId,
// //             startDate,
// //             endDate,

// //         })
// //         res.status(200).json({
// //             eventCalendarList,
// //         })
// //     } catch (error) {
// //         res.status(400).send({
// //             result: false,
// //             msg: "일정조회 실패"
// //         })
// //     }

// // }

// // //추억상세보기
// // const getPhotoEventDetail = async (req, res) => {

// // }

// module.exports = {
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getEvent,
// };
