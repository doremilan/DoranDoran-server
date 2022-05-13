const schedule = require("node-schedule");
const Event = require('../schemas/event');
const Family = require("../schemas/family");
const FamilyMember = require("../schemas/familyMember");
const User = require('../schemas/user')

// // 유저정보로 familyId를 확인 후
// // 해당 familyId로 eventDB 확인
// // 확인 후 eventDB에서 startDate 추출 후
// // 해당 startDate가 만약 22-05-13이면 22-05까지 확인 후
// // 5월달 이벤트는 5월1일9시에 알림발송 (위에 rule부분이 1~12월 1일 9시에 보낸다는 내용)
// // 13일 이벤트면 하루 전날 알림발송
// // rule부분에 db에서 startDate를 찾고 해당날짜 전날로 시간지정 후
// // job 안에서 해당 event 이름 출력하면 될듯?


// // event , startDate, familyMember <--


// // 근데 유저정보는 어떻게받느냐가 궁금
// // set이라는 함수를 반복하는건 set함수 안에 job을 통해서 로직이 실행되는거라
// // 특정함수를 콘솔로그대신 특정시간마다 요청하게끔 실행하게 만들면 되나?
// // 월에 1번 실행되는 set 하나랑
// // 해당 event 하루전에 실행되는 set 하나를 만들어서
// // 새로운 set 함수 job 안에 위 두개를 넣으면되나?


// // 생각해보니 모든 유저한테 이 알림이 가야됨
// // 특정 유저를 확인해서 보내는게 아니라


// // 필요한 데이터 : event (제목) , startDate
// // envet DB를 전부 확인하고 
// // 등록된 event의 familyId와 event(제목),startDate를 확인 후 추출
// // familyMember DB를 불러와서
// // familyMamber DB 안에 추출한 familyId가 있는지 확인
// // 있다면 해당 familyMember의 userId로 event랑 startDate를



//테스트용
const getMonthEvent = async (req, res) => {
    const { familyId } = req.params;
    // console.log(familyId)
    try {
        const findEvent = await Event.find({ familyId: familyId })
        console.log(1111, findEvent)
        const findFamilyMember = await FamilyMember.find({ familyId: familyId })
        // console.log(findFamilyMember)
        // console.log(111, findEvent.familyId)
        let memberEvent = []
        let memberList = []
        for (let events of findEvent) {
            let eventFamilyId = events.familyId
            let eventTitle = events.event
            events.eventTitle = eventTitle
            // console.log(111, events.eventTitle)

            let eventDate = events.startDate
            if (eventFamilyId == familyId) {
                memberEvent.push(`Event : ${eventTitle}, EventDate : ${eventDate}`)
            }
            // console.log(11, memberEvent)
        }


        for (let member of findFamilyMember) {
            let memberUser = member.userId
            let memberFamilyId = member.familyId
            if (memberFamilyId == familyId) {
                memberList.push({ memberUser, memberEvent })
            }
            // console.log(33, memberList)
        }
        // console.log(1111, memberList)

        res.status(200).json({
            memberList
        })
        // if (memberEvent.familyId == memberList.familyId) {
        //     memberEvent.push(memberList.userId)
        //     res.status(200).json({
        //         memberEvent
        //     })
        // } else {
        //     res.status(400).send({
        //         msg: "에러임"
        //     })
        // }

    } catch (error) {
        res.status(400).send({
            msg: "오류임"
        })
        console.log(error)
    }
}

// // //매달 1일 9시에 실행
// // const rule = new schedule.RecurrenceRule();
// // rule.month = [1 - 12];
// // rule.date = 1;
// // rule.hour = 9;


// // const job = schedule.scheduleJob(rule, function () {
// //     // 한달 일정 getMonthEvent();
// // });

// // 매달 1일은 미션이 새로 생긴다는걸 알리는용도

// // 프론트에 보내는거 먼저 확인


// const getTest = async (req, res) => {
//     const a = await Event.find({})
//     res.status(200).send({
//         a
//     })
// }


// const set = (s) => {
//     let rule = new schedule.RecurrenceRule();
//     rule.dayOfWeek = [3];  // 3이 목요일
//     rule.hour = 17;
//     rule.minute = 55;

//     let job = schedule.scheduleJob(rule, function () {
//         getTest();
//     })
// }

// // getTest();
// set();

module.exports = {
    getMonthEvent
};


// const schedule = require('node-schedule');

// schedule.scheduleJob('*/2 * * * * *', function () {
//     console.log('The answer to life, the universe, and everything!');
// });
