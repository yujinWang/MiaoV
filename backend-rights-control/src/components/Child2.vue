<template>
  <div>
    <h3>以下是child2组件中的数据</h3>
    <p>以下数据是通过inject注入得到的父组件的父组件中的值，可以跨越任意多的层级</p>
    <span v-for="(item, index) in test" :key="index"> {{item}} </span>
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
</style>
