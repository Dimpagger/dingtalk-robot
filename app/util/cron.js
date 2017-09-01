import schedule from 'node-schedule';

// crontab 组件
// let rule = new schedule.RecurrenceRule();
// let times = [];
// for(let i=1; i<60; i++){
//     times.push(i);
// }
// rule.minute =times;
// schedule.scheduleJob(rule, function(){
//     console.log('hehe');
// });

export default function cron (cronExpression) {
    schedule.scheduleJob(cronExpression, function () {
        console.log('The answer to life, the universe, and everything!');
    });
}
