// 此文件为axios的封装，实现请求拦截和相应拦截
// 同时也设计到权限控制的一些东西，请求拦截中可以添加一些通用的请求头
// 相应拦截可以进行一些基本报错信息的提示，免去了在每个接口中判断
import axios from "axios"
import { Message } from "element-ui"
import store from "@/utils/auth"
import { getToken } from "@/utils/auth"

// 创建一个axios实例-需要使用到.env.development文件和.evn.prodeution文件
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //url = base url + request url
    timeout: 5 * 1000 //设置请求超时时间
})

// 请求拦截
service.interceptors.request.use(
    config => {
        // do something before request send，给每个请求添加请求头
        if (store.getters.token) {
            config.headers["X-Token"] = getToken()
        }
        return config
    },
    error => {
        // do something with error request
        // console.log(error)
        return Promise.reject(error)
    }
)
// 响应拦截
service.interceptors.response.use(
    response => {
        const res = response.data // 和后台约定的返回的数据存放在data中
        return res
        // 对后台各种保存状态码的定义，暂时不需要
        // if (res.code !== 200) {
        //     Message({
        //         message: res.message || showStatus(res.code) || "Error",
        //         type: "error",
        //         duration: 5 * 1000
        //     })
        //     return Promise.reject(new Error(res.message || "Error"))
        // } else {
        //     return res
        // }
    },
    error => {
        // console.log("err" + error)
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service

// 对后台各种报错函数
// const showStatus = (code) => {
//    let message = "";
//    switch (code) {
//         case 400:
//             message = '请求错误(400)'
//             break
//         case 401:
//             message = '未授权，请重新登录(401)'
//             break
//         case 403:
//             message = '拒绝访问(403)'
//             break
//         case 404:
//             message = '请求出错(404)'
//             break
//         case 408:
//             message = '请求超时(408)'
//             break
//         case 500:
//             message = '服务器错误(500)'
//             break
//         case 501:
//             message = '服务未实现(501)'
//             break
//         case 502:
//             message = '网络错误(502)'
//             break
//         case 503:
//             message = '服务不可用(503)'
//             break
//         case 504:
//             message = '网络超时(504)'
//             break
//         case 505:
//             message = 'HTTP版本不受支持(505)'
//             break
//         default:
//             message = `连接出错(${code})!`
//    }
// }
