<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">机构列表 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-body-content table-port">
      <el-table class="x-table" :data="tableData" border style="width:100%">
        <el-table-column prop="id" align="center" label="ID"></el-table-column>
        <el-table-column prop="username" align="center" label="用户名称"></el-table-column>
        <el-table-column prop="name" align="center" label="联系人"></el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goNextPage(scope.row)">权限配置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页 start-->
      <div  class="x-pagination" flex="main:right">
        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="totalNum" @current-change="handleHandlePayCurrentChange"></el-pagination>
      </div>
      <!--分页 end-->
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
        tableData: [],
        pageSize:15, // 每一页显示数据条数
        totalNum:0, //  数据总数
        chargePage:1, //页码
      }
    },
    computed: {
      username () {
        return this.$store.state.userInfo.username
      }
    },
    methods: {
      ...mapActions([
        'getConfigListServer',//机构配置列表
      ]),
      /**
       *  机构配置列表 数据
       * */
      getConfigList(){
//        NProgress.start(); // 页面切换，显示加载条
        this.getConfigListServer({
          page:this.chargePage,
          page_size:this.pageSize,
        }).then(res=>{
//          NProgress.done(); // 页面切换，显示加载条
          this.tableData = res.data.list;
          this.totalNum = +res.data.total;
        })
      },
      /**
       *  分页 方法
       * */
      handleHandlePayCurrentChange(currentPage){
        this.chargePage = currentPage;
        this.getConfigList();
      },
      /**
      * 前往 权限配置页
      * */
      goNextPage(scope){
        this.$router.push({ name: 'mechanism-power-list',query:{id:scope.id}});
      }
    },
    beforeRouteEnter(to,form,next){
      next(vm=>{
        vm.getConfigList();
      })
    }
  }
</script>

<style lang="scss">
  @import "mechanism-list.scss";
</style>
<style lang="scss">
  .table-port{
    .el-table--border  {
      border-right: 1px solid #e6ebf5 !important;
    }
  }
</style>
