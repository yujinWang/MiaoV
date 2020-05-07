import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 对应权限与请求方法的映射
const methodMapping = {
  'get': 'view',
  'post': 'add',
  'put': 'edit',
  'delete': 'delete'
}
// 请求拦截-可以阻止通过开发工具修改按钮状态为可用做一些非法操作等
axios.interceptors.request.use(request => {
  console.log(request)
  // 请求认证-https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Authorization
  request.headers.Authorization = sessionStorage.getItem('token')
  const currentUrl = request.url
  if (currentUrl !== 'login') {
    const method = request.method
    const action = methodMapping[method]
    const navMenu = router.currentRoute.meta
    if (navMenu && navMenu.indexOf(action) === -1) {
      alert('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
  }
  return request // 必须返回此对象
})
// 响应拦截
axios.interceptors.response.use(function(res) {
  if (res.data.meta.status === 401) {
    router.push('/login')
    sessionStorage.clear()
    window.location.reload()
  }
  return res
})

Vue.prototype.$http = axios
