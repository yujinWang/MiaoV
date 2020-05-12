<template>
  <div>
    <h3>Welcome</h3>
    <p>页面中如要对得到的数据进行筛选后再展示的话可以使用computed计算属性，在不改变原数据的情况下</p>
    <li v-for="(item,index) in filterMenuList" :key="index">
      {{item.name}}
      {{item.age}}
    </li>
    <!-- <li v-for="(item,index) in filterMenuList33" :key="index">
      {{item}}
    </li> -->
  </div>
</template>
<script>
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
  mounted() {
    console.log(this.filterMenuList)
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
  methods: {
    // 根据数组对象中的某个属性重新排列数组
    compare(param) {
      return function(obj1, obj2) {
        let val1 = obj1[param]
        let val2 = obj2[param]
        return val1 - val2 // 升序
        // return val2 - val1 // 降序
      }
    }
  }
}
</script>
