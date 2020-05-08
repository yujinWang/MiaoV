import Vue from 'vue'
import router from '@/router'

Vue.use(router)

Vue.directive('permission', {
  inserted: function(el, binding) {
    // 官方实例，修改绑定自定义指令元素的样式-<el-button type="primary" v-permission=120>添加商品</el-button>
    // 经测试，对于120，Number/String类型的都是可以的，如果需要绑定多个值，可以采用对象字面量的形式
    // el-当前绑定自定义指令的元素，binding一个对象，包含绑定的指令信息等
    // el.style.position = 'fixed'
    // el.style.top = binding.value + 'px'
    // console.log(el)
    // console.log(binding)
    // console.log(router.currentRoute)
    const action = binding.value.action
    const currentMenu = router.currentRoute.meta
    // console.log(action) // "view"等
    // console.log(currentMenu) // ["view", "edit", "add", "delete"]
    if (currentMenu) {
      // 没有里面对应的任何一个权限-隐藏或者禁用(根据需要)
      if (currentMenu.indexOf(action) === -1) {
        const type = binding.value.effect
        if (type === 'disabled') {
          el.disabled = true
          el.classList.add('is-disabled') // element中按钮禁用需添加的样式
        } else {
          el.parentNode.removeChild(el)
        }
      }
    }
  }
})