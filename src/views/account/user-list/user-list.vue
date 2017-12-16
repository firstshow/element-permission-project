<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">用户管理 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-operation-box" flex="main:right">
      <el-button type="primary" class="login-btn" v-has="'/account/user-list/user-edit'" @click="goNextPage('user-edit')">添加用户</el-button>
    </div>
    <div class="x-body-content no-padding-top">
      <el-table
        class="x-table"
        :data="tableData"
        border
      >
        <el-table-column
          prop="date"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="address"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="最后登录时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
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
    computed: {
      username() {
        return this.$store.state.userInfo.username
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import "user-list.scss";
</style>
