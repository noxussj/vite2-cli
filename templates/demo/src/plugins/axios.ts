import axios from 'axios'
import qs from 'qs'
import { url } from 'config/api'

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config: any) => {
    // if (import.meta.env.MODE === 'development') {
    //     config.url = url + config.url
    // }

    return config
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use((response: any) => {
    return response
})

/**
 * 接口请求方法
 */
const request = (method: string, option: any, fn: Function = (x: any) => x) => {
    return new Promise((resolve) => {
        if (option.url) {
            const param = qs.stringify(option.param, { arrayFormat: 'repeat' })

            axios({
                method: method,
                url: option.url,
                params: method === 'get' ? param : {},
                data: method === 'post' ? param : {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;'
                },
                withCredentials: true, // 携带cookie
                timeout: 5000
            }).then((res) => {
                resolve(fn(res.data))
            })
        } else {
            resolve(fn(null))
        }
    })
}

export default {
    get: (option: any, fn: Function = (x: any) => x) => request('get', option, fn),
    post: (option: any, fn: Function = (x: any) => x) => request('post', option, fn),
    put: (option: any, fn: Function = (x: any) => x) => request('put', option, fn)
}
