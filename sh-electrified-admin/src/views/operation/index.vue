<template>
    <div class="operation-home-page">

      <!--搜索 部分 start-->
      <div class="search-port">
        <span class="SN-code-title">SN码:</span> <el-input v-model="SNCode" placeholder="请输入内容"></el-input>

        <el-button type="primary" @click="searchSNCode">查找</el-button>
        <el-button type="primary">添加单条SN码</el-button>
        <el-button type="primary">批量导入SN码</el-button>
        <el-button type="primary">下载Excel模板</el-button>
        <el-button type="primary">下载全部SN码</el-button>
      </div>
      <!--搜索 部分 end-->

      <!--table部分 start-->
      <div class="table-port">
        <el-table :data="tableData" border style="width: 99%" >
          <el-table-column prop="SN_code" label="SN码" align="center"></el-table-column>
          <el-table-column prop="add_time" label="添加时间" align="center"></el-table-column>
        </el-table>
      </div>
      <!--table部分 end-->
    </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
    export default {
      data(){
        return {
          SNCode:'',// 输入的sn码
          tableData:[],//table 列表的数据
        }
      },
      methods:{
        ...mapActions([
          'operateSearchServer',//运营操作搜索接口
        ]),
        /**
        *  运营操作搜索接口 数据
        * */
        operateSearch(){
          this.operateSearchServer({}).then(res=>{
            this.tableData = res.data.list;
            console.log(res);
          })
        },
          /**
          * 查找按钮
          * */
        searchSNCode(){
          this.operateSearch();
        }
      }
    }
</script>

<style lang="less" scoped>
  @import './../../assets/css/modules/operationHomePage';
</style>
