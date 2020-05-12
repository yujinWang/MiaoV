<template>
  <div>
    <h3>自定义指令-directives-初始部分，还可以在binding中绑定信息做更多操作，使用如v-changePosition="{a:xxx,b:xxx}"</h3>
    <div class="div1">
      <p>我是初始元素</p>
      <p v-changeColor>我使用了自定义指令changeColor颜色变了</p>
      <p v-changePosition>我使用了自定义指令changePosition位置变了</p>
      <p v-changeView>我使用了自定义指令changeView在dom中删除了自己</p>
      <span>这下面的p元素被自定义指令删除了</span>
      <p v-globalChangeColor>我使用了全局自定义指令改变颜色</p>
      <p v-globalChangePosition>我使用了全局自定义指令改变位置</p>
      <p v-changeColor>组件内定义的自定义指令和全局的重名，组件内定义的优先，组件内为red，全局为blue</p>
    </div>
    <h3>过滤器局部-filters</h3>
    <p>{{ msg | capitalize }}</p>
    <p :title = 'msg2'>{{ msg2 | ellipsis(10) }}</p>
    <h3>过滤器全局-filters</h3>
    <p>{{ msg3 | capitalizeGlobal }}</p>
    <p :title = 'msg2'>{{ msg2 | ellipsisGlobal(5) }}</p>
    <new-table
      :tableData="tableData"
      :tableHead="tableHead"
      :selectionShow=true
      :indexShow=true
      indexLabel="序号"
      indexWidth="50"
      @selectionChange="childSelectionChange">
    </new-table>
    <el-button type="primary" @click="addData">通过$set增加对象属性值</el-button>
    <ul id="v-for-object" class="demo">
      <li v-for="(value,index) in object" :key="index">
        {{ value }}
      </li>
    </ul>
    <el-button type="primary" @click="addArrData">通过$set给数组添加或修改数组某个元素</el-button>
    <ul class="demo">
      <li v-for="(value,index) in arrList" :key="index">
        {{ value }}
      </li>
    </ul>
  </div>
</template>
<script>
import NewTable from '@/components/table'
export default {
  data() {
    return {
      msg: 'abcd-局部过滤器-将abcd变为了大写',
      msg2: '这个字符串太长了，会省略号显示',
      msg3: 'abcd-全局过滤器-将abcd变为了大写',
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10',
        age: 202
      },
      arrList: [1, 2, 3, 4],
      object1: [
        {
          title: 'How to do lists in Vue'
        },
        {
          title: 'How to do lists in Vuessss'
        }
      ],
      tableHead: [
        {
          width: 150,
          label: '日期',
          prop: 'date',
          align: 'center', // 列对齐方式
          headerAlign: 'center', // 列头对其方式
          fixed: false, // 列是否固定
          filterShow: true, // 是否开启过滤
          sortable: true // 是否开启排序
        },
        {
          width: 150,
          label: '姓名',
          prop: 'name',
          align: 'center',
          headerAlign: 'center',
          fixed: false,
          filterShow: true,
          sortable: true
        },
        {
          width: 250,
          label: '地址',
          prop: 'address',
          align: 'center',
          headerAlign: 'center',
          fixed: false,
          sortable: true
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ]
    }
  },
  components: {
    NewTable
  },
  directives: {
    // inserted-被绑定元素插入父节点时候调用，el当前绑定的DOM元素，可以直接操作节点，binding为一个对象
    changeColor: {
      inserted(el, binding) {
        el.style.color = 'red'
      }
    },
    changePosition: {
      inserted(el, binding) {
        el.style.marginTop = '50px'
      }
    },
    changeView: {
      inserted(el, binding) {
        el.parentNode.removeChild(el)
      }
    }
  },
  filters: {
    capitalize(value) {
      // console.log(value) // value为当前添加过滤器的dom元素值
      if (!value) return ''
      return value.toUpperCase()
    },
    ellipsis(value, len) {
      // console.log(value, len)
      if (!value) return ''
      if (value.length > len) {
        return value.slice(0, len) + '...'
      }
      return value // return value必须，若不满足上面添加...情况下返回原值
    }
  },
  methods: {
    childSelectionChange(data) {
      console.log(data)
      // 可进行删除等操作
    },
    addData() {
      // console.log(this.object)
      // this.object.age = 20
      // 对象属性的添加/修改都用如下方式实现-如果要修改多个属性值需要分别每次定义
      this.$set(this.object, 'author', 'zhangsan')
      this.$set(this.object, 'age', '1000')
    },
    addArrData() {
      // 修改数组中某个值虽然打印结果中改变了，但是视图并不会刷新
      // this.arrList[3] = 666
      // console.log(this.arrList)
      // 修改的方法通过如下方式进行 vm.$set(target, key, value)
      // 目标、要修改元素的索引、新的赋值
      // this.$set(this.arrList, 1, 777)
      // 如果是通过push等方法操作，这相当于是改变了原数据结构，会天然生效，可以同时添加/删除多个值
      this.arrList.push(666, 999)
    }
  }
}
</script>>
<style scoped>
  .div1 {
    display: flex;
  }
  .div1 p {
    width: 150px;
    height: 100px;
    border: 2px solid red;
    margin-right: 10px;
  }
</style>
