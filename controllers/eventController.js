const Event = require('../schemas/event')



//일정 작성
const createEvent = async (req, res) => {
    const { userId } = res.locals;
    const { familyId } = req.params;
    const { event, startDate, endDate, color } = req.body;

    const createEvent = await Event.create({
        userId,
        familyId,
        event,
        startDate,
        endDate,
        color
    });

    res.status(201).json({
        createEvent,
        msg: "일정 등록 완료"
    });
}

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
        await Event.updateOne({ eventId }, {
            $set: {
                event,
                startDate,
                endDate,
                color,
            }
        })
        res.status(200).json({
            msg: "수정 완료되었습니다."
        })
    }
}


//일정 삭제
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const existtEvent = await Event.findOne({ eventId });
        if (existtEvent) {
            await Event.deleteOne({ eventId })

            res.status(204).json({
                result: true,
                msg: "삭제되었습니다.",
            });
        }
    } catch (error) {
        res.status(400).send({
            result: false,
            msg: "삭제를 실패했습니다."
        })
    }
}


//일정 조회 (받는걸 어케써야될지 흠)
const getEvent = async (req, res) => {
    const { familyId, date } = req.params;

}

//추억 조회


//추억상세보기







module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,

}