import schedule from 'node-schedule';
import request from './request';

export default function cron (cronExpression, url, data) {
    schedule.scheduleJob(cronExpression, function () {
        console.log('The answer to life, the universe, and everything!');

        request({
            url: url,
            method: 'POST',
            data: data
        }).then((data) => {
            console.log(data);
        })
    });
}
