<template>
  <div>
    <h3>我是child2组件</h3>
    <p>以下数据是通过inject注入得到的父组件的父组件中的值，可以跨越任意多的层级</p>
    <span v-for="(item, index) in test" :key="index"> {{item}} </span>
    <h4>假如发现需要在vue中做一次强制更新，99.9%的情况下是在某个地方做错了</h4>
  </div>
</template>

<script>
export default {
  inject: [ 'test', 'testFun' ],
  mounted() {
    // console.log(this.test)
    // console.log(this.testFun())
  }
}
</script>
<style scoped>
  h4 {
    color: red;
  }
</style>
