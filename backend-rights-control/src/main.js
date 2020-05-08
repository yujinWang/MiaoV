import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import './plugins/element.js'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import './utils/http.js'
import './utils/dateformat.js'
import './utils/permission.js'
import './directives/index.js'
// import * as directives from './directives/index.js'
// console.log(directives)

// import './filters/index.js'
import * as filters from './filters/index.js'
// filters为引入的js文件中的所有内容
// console.log(filters)
// console.log(Object.keys(filters))
// 过滤器全局注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
