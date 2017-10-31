<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'mechanism-list'}">机构列表 </el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-operation-box" flex="main:right">
      <el-button type="primary" class="login-btn" @click="goNextPage('mechanism-power-edit')">新增缴费类型</el-button>
    </div>
    <div class="x-body-content no-padding-top">
      <el-table
        class="x-table"
        :data="tableData"
        border
      >
        <el-table-column
          prop="date"
          label="缴费类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="机构编号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="条形码识别规则">
        </el-table-column>
        <el-table-column
          prop="address"
          label="条形码总长度">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goNextPage('mechanism-power-edit')">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="x-pagination" flex="main:right">
        <el-pagination
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          small
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import publicMixin from 'src/mixins/publicMixin'
  export default {
    name: 'home',
    mixins: [publicMixin],
    data() {
      return {
        tableData: [{
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
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import "mechanism-power-list.scss";
</style>
