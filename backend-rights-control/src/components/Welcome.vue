<template>
  <div>
    <h3>Welcome</h3>
    <p>页面中如要对得到的数据进行筛选后再展示的话可以使用computed计算属性，在不改变原数据的情况下</p>
    <p>同样也可以在如页面中需要对表格数据进行筛选操作场景下使用计算属性</p>
    <li v-for="(item,index) in filterMenuList" :key="index">
      {{item.name}}
      {{item.age}}
    </li>
    <!-- <li v-for="(item,index) in filterMenuList33" :key="index">
      {{item}}
    </li> -->
    <Child></Child>
  </div>
</template>
<script>
import Child from './Child'
export default {
  data() {
    return {
      menuList: [
        {
          name: '张三',
          age: 20
        },
        {
          name: '李四',
          age: 30
        },
        {
          name: '王五',
          age: 15
        }
      ],
      menuList33: [1, 5, 2, 55, 44, 23]
    }
  },
  components: { Child },
  mounted() {
    // console.log(this.filterMenuList)
    // console.log('this.$root.foo', this.$root)
  },
  computed: {
    filterMenuList() {
      return this.menuList.sort(this.compare('age'))
    },
    filterMenuList33() {
      return this.menuList33.filter(item => {
        return item >= 5
      })
    }
  },
  // provide可理解为范围更大的props，后代组件无需关心提供的方法来自哪里，祖先组件无需关心哪些后代组件会使用
  // 在后代组件中使用方式是 inject: ['test']就可以调用到此组件中定义的Test方法
  provide() {
    return {
      test: this.menuList33,
      testFun: this.testFunc
    }
  },
  methods: {
    // 根据数组对象中的某个属性重新排列数组
    // 使用一个高阶函数，高阶函数定义1-函数中的返回值还是一个函数
    compare(param) {
      return function(obj1, obj2) {
        let val1 = obj1[param]
        let val2 = obj2[param]
        return val1 - val2 // 升序
        // return val2 - val1 // 降序
      }
    },
    testFunc() {
      return '函数中的返回值'
    },
    // 最大公约数
    commonDivisor(m, n) {
      let r = m % n
      if (r === 0) {
        this.result = n
        return this.result
      } else {
        return this.commonDivisor(n, r)
      }
    }
  }
}
</script>
