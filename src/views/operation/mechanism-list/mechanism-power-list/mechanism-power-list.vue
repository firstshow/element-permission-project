<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'mechanism-list'}">机构列表 </el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-operation-box" flex="main:right">
      <el-button type="primary" class="login-btn" @click="goNextPage">新增缴费类型</el-button>
    </div>
    <div class="x-body-content no-padding-top table-port">
      <el-table class="x-table" :data="tableData" border>
        <el-table-column prop="type" label="缴费类型" align="center"></el-table-column>
        <el-table-column prop="organiza_name" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="organiza_number" label="机构编号" align="center"></el-table-column>
        <el-table-column prop="discern_rule" label="条形码识别规则" align="center"></el-table-column>
        <el-table-column prop="code_length" label="条形码总长度" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goNextPage(scope.row)">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
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
        id:'',//机构列表中id
        tableData: [],


        pageSize:15, // 每一页显示数据条数
        totalNum:0, //  数据总数
        chargePage:1, //页码
      }
    },
    methods: {
      ...mapActions([
        'getJurisdicConfigListServer',//权限配置列表
      ]),
      /**
       *  权限配置列表 数据
       * */
      getJurisdicConfigList(){
//        NProgress.start(); // 页面切换，显示加载条
        this.getJurisdicConfigListServer({
          id:this.id,
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
        this.getJurisdicConfigList();
      },
      /**
       * 前往修改页面
       * */
      goNextPage(scope){
        this.$router.push({ name: 'mechanism-power-edit',query:{id:scope.id}});
      }
    },
    beforeRouteEnter(to,form,next){
      next(vm=>{
        console.log(to.query.id);
        vm.id = to.query.id;
        vm.getJurisdicConfigList();
      })
    }
  }
</script>

<style lang="scss">
  @import "mechanism-power-list.scss";
</style>
<style lang="scss">
  .table-port{
    .el-table--border  {
      border-right: 1px solid #e6ebf5 !important;
    }
  }
</style>
