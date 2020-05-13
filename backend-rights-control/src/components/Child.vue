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
  methods: {
    // axios执行并发操作-使用axios.all()方法，接受一个数组类型的参数，元素为要执行的方法
    // axios是一个基于promise的http库，不论是request还是response请求，都会接受两个函数
    // 作为参数，一个处理正常流程，一个处理异常流程，axios内部正式利用了这两个机制
    // getUserAccount() {
    //   return axios.get('/user/12345');
    // },
    // getUserPermissions() {
    //   return axios.get('/user/12345/permissions');
    // },
    // axios.all([getUserAccount(), getUserPermissions()])
    //   .then(axios.spread(function (acct, perms) {
    //     // 两个请求现在都执行完成
    //   })
    // )
  }
}
</script>
