<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { initDynamicRouters } from '@/router'
export default {
  name: 'app',
  data() {
    return {
      foo: 123
    }
  },
  created() {
    initDynamicRouters()
  }
}
</script>

<style>
</style>
