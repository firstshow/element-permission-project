<template>
  <div class="x-main-body">
    <div class="x-body-header" flex="main:justify cross:center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">SN码管理 </el-breadcrumb-item>
      </el-breadcrumb>

      <div flex="main:right">
        <el-input v-model="params.searchValue" placeholder="请输入搜索内容" style="margin-right: 5px"></el-input>
        <el-button type="primary" >搜索</el-button>
      </div>
    </div>
    <div class="x-operation-box" flex="main:right">
      <el-button type="primary" class="login-btn" >添加单条SN码</el-button>
      <el-button type="primary" class="login-btn" >批量倒入SN码</el-button>
      <el-button type="primary" class="login-btn" >下载Excel模版</el-button>
      <el-button type="primary" class="login-btn" >下载全部SN码</el-button>
    </div>
    <div class="x-body-content no-padding-top">
      <el-table
        class="x-table"
        :data="tableData"
        border
      >
        <el-table-column
          prop="date"
          label="SN码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="添加时间">
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
        }],
        params:{
          searchValue: ''
        }
      }
    },
    computed: {
      username () {
        return this.$store.state.userInfo.username
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import "sn-list.scss";
</style>
