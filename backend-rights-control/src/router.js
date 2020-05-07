import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
// import NotFound from '@/assets/404.png'
import store from '@/store'

Vue.use(Router)

// 每个用户的children里面应该显示什么信息，需要根据用户权限动态添加进去
const userRole = { path: '/users', component: Users }
const roleRole = { path: '/roles', component: Roles }
const goodRole = { path: '/goods', component: GoodsList }
const categorieRole = { path: '/categories', component: GoodsCate }

// 权限path和路由映射
const ruleMapping = {
  'users': userRole,
  'roles': roleRole,
  'goods': goodRole,
  'categories': categorieRole
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome }
        // { path: '/users', component: Users },
        // { path: '/roles', component: Roles },
        // { path: '/goods', component: GoodsList },
        // { path: '/categories', component: GoodsCate }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

// 判断用户是否有token权限-每个用户token独一无二，在一次token有效期内token是独一无二的
// 退出时候sessionStorage中的信息清空，token也被清除，解决是用户未登录情况下手动输入页面路由可以访问的问题
// 防止用户跳过登录界面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

// 根据二级权限动态导出需要添加的路由-在登录方法成功之后进行动态添加
export function initDynamicRouters() {
  const currentRoutes = router.options.routes
  // console.log(currentRoutes)
  const menuList2 = store.state.menuList2
  menuList2.forEach(item => {
    item.children.forEach(item => {
      const temp = ruleMapping[item.path]
      // 在没有在登出时候执行window.location.reload()方法时候每次登录时候都会添加一遍当前路由，导致某些问题
      currentRoutes[2].children.push(temp)
      // 添加meta信息-和在path里面添加meta字段一样，只不过这里是通过从返回结果中进行赋值
      temp.meta = item.rights
    })
  })
  // console.log(router)
  router.addRoutes(currentRoutes)
}

export default router
