const schedule = require("node-schedule");
const Event = require('../schemas/event')


const set = (s) => {

    const evnetStartDate = Event.find({})
    const startTime = new Date(Date.now() + 5000);
    console.log(evnetStartDate);
    const endTime = new Date(startTime.getTime() + 5000);
    const job = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function () {
        console.log('Time for tea!');
    });
}

set();