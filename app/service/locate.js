import request from '../util/request';

export default function locate (){
    request({
        url: 'http://restapi.amap.com/v3/ip',
        method: 'GET',
        data: {key: '2dc585de6fc999cb5e2802c895ee6ce7'}
    }).then((data) => {
        console.log(data);
    })
}
