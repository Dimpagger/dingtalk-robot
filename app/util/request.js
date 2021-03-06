import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'

const fetch = (options) => {
    let {
        method,
        data,
        fetchType,
        url,
    } = options;

    if (fetchType === 'JSONP') {
        return new Promise((resolve, reject) => {
            jsonp(url, {
                param: `${qs.stringify(data)}&callback`,
                name: `jsonp_${new Date().getTime()}`,
                timeout: 4000,
            }, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve({ statusText: 'OK', status: 200, data: result })
            })
        })
    }

    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(`${url}${!lodash.isEmpty(data) ? `?${qs.stringify(data)}` : ''}`)
        case 'delete':
            return axios.delete(url, { data })
        case 'head':
            return axios.head(url, data)
        case 'post':
            console.log(url, data);
            return axios.post(url, data)
        case 'put':
            return axios.put(url, data)
        case 'patch':
            return axios.patch(url, data)
        default:
            return axios(options)
    }
}

export default function request (options) {
    if (options.url && options.url.indexOf('//') > -1) {
        const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
        if (window.location.origin !== origin) {
            // if (cors && cors.indexof(origin) > -1) {
            //     options.fetchtype = 'cors'
            // }else {
            //     options.fetchType = 'JSONP'
            // }
        }
    }

    return fetch(options).then((response) => {
        const { statusText, status } = response
        let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
        return {
            success: true,
            message: statusText,
            status,
            ...data,
        }
    }).catch((error) => {
        const { response } = error
        let message
        let status
        if (response) {
            status = response.status
            const { data, statusText } = response
            message = data.message || statusText
        } else {
            status = 600
            message = 'Network Error'
        }
        return { success: false, status, message }
    })
}
