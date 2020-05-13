<template>
  <div>
    <h3>我是child组件</h3>
    <Child2></Child2>
    <!-- <p v-for="(item, index) in test" :key="index">{{item}}</p> -->
  </div>
</template>

<script>
import Child2 from './Child2'
export default {
  inject: [ 'test', 'testFun' ],
  mounted() {
    // console.log(this.test)
    // console.log(this.testFun())
  },
  components: { Child2 },
}
</script>
