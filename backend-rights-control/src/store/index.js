import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 第一步初始给默认值，信息只保存在vuex里面-问题在于刷新后菜单会消失
    // userName: '',
    // menuList2: []
    // 2222第二步解决办法是登录同时将信息保存在sessionStorage中
    userName: sessionStorage.getItem('userName'),
    menuList2: JSON.parse(sessionStorage.getItem('menuList') || '[]')
  },
  mutations: {
    setUserName (state, data) {
      state.userName = data
      // 2222解决刷新后vuex中信息消失问题
      sessionStorage.setItem('userName', data)
    },
    setMenuList (state, data) {
      state.menuList2 = data
      // 2222解决刷新后vuex中信息消失问题
      sessionStorage.setItem('menuList', JSON.stringify(data))
    }
  },
  actions: {
  },
  getters: {
  }
})
