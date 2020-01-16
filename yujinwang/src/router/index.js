import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

// 静态路由，任何人员都可以查看的页面
export const constantRoutes = [

]

// 动态路由，不同权限人员所能看到的页面不同
export const asyncRoutes = [

]

// 创建路由实例
const createRouter = () => new Router({
    routes: constantRoutes
})

const router = createRouter()

export default router