<template>
  <div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange">
      <!--多选列-->
      <el-table-column
        v-if="selectionShow"
        type="selection"
        width="50"
        align="center"
        highlight-current-row>
      </el-table-column>
      <!--自定义添加排序列-->
      <el-table-column
        v-if="indexShow"
        align="center"
        :label="indexLabel"
        :width="indexWidth">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableHead"
        :header-align="item.headerAlign"
        :align="item.align"
        :key="index"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :sortable="item.sortable">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    indexShow: Boolean, // 是否显示排序列
    selectionShow: Boolean, // 是否显示多选列
    indexLabel: null, // 排序列名称
    indexWidth: null, // 排序列宽度
    tableHead: Array, // 表头数据
    tableData: Array // 表格数据
  },
  watch: {
    // 监听表格数据
    tableData: {
      handler(val, oldVal) {
        this.tableData = val
      }
    },
    // 监听表头数据
    tableHead: {
      handler(val, oldVal) {
        this.tableHead = val
      }
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.$emit('selectionChange', selection)
    }
  }
}
</script>
