// 自定义过滤器
// import Vue from 'vue'
// Vue.filter('capitalizeGlobal', (value) => {
//   // console.log(value)
//   if (!value) return ''
//   return value.toUpperCase()
// })
// Vue.filter('ellipsisGlobal', (value, len) => {
//   if (!value) return ''
//   if (value.length > len) {
//     return value.slice(0, len) + '...'
//   }
//   return value
// })

// 修改为函数导出方式再在main.js中处理
export function capitalizeGlobal(value) {
  if (!value) return ''
  return value.toUpperCase()
}
export function ellipsisGlobal(value, len) {
  if (!value) return ''
  if (value.length > len) {
    return value.slice(0, len) + '...'
  }
  return value
}
