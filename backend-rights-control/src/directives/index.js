// 全局过滤器
import Vue from 'vue'
Vue.directive('globalChangeColor', {
  inserted(el, binding) {
    el.style.color = 'blue'
  }
})
Vue.directive('globalChangePosition', {
  inserted(el, binding) {
    el.style.marginTop = '50px'
  }
})
Vue.directive('changeColor', {
  inserted(el, binding) {
    el.style.color = 'blue'
  }
})
// export function globalChangeColor() {
//   return function inserted(el, binding) {
//     el.style.color = 'blue'
//   }
// }
// export function globalChangePosition() {
//   return function inserted(el, binding) {
//     el.style.marginTop = '50px'
//   }
// }
// export function changeColor() {
//   return function inserted(el, binding) {
//     el.style.color = 'blue'
//   }
// }