<template>
  <div class="x-main-body">
    <div class="x-body-header" flex="main:justify cross:center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">SN码管理 </el-breadcrumb-item>
      </el-breadcrumb>

      <div flex="main:right">
        <!--<el-input v-model="searchValue" placeholder="请输入搜索内容" style="margin-right: 5px"></el-input>-->
        <input class="search-value" type="text" placeholder="请输入搜索内容" v-model="searchValue">
        <el-button type="primary" @click="searchSNCode">搜索</el-button>
      </div>
    </div>
    <div class="x-operation-box" flex="main:right">
      <el-button type="primary" class="login-btn" @click="addSNCode">添加单条SN码</el-button>
      <el-button type="primary" class="login-btn" @click="exportSNCode">批量导入SN码</el-button>
      <el-button type="primary" class="login-btn" @click="loadExcelModel">下载Excel模版</el-button>
      <el-button type="primary" class="login-btn" @click="loadAllSNCode">下载全部SN码</el-button>
    </div>

    <!--弹出框 start-->
    <div class="import-sn-code">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="closeDialog" :modal-append-to-body="false">
        <div class="SNCode-title-port">
          <span class="SNCode-title">SN码上传</span>
          <input class="SNCode-content" type="text" placeholder="请认真输入，确保完全正确" v-model="snCode">
        </div>
        <input type="text">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCode">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!--弹出框 end-->
    <div class="x-body-content no-padding-top">
      <!--table部分 start-->
      <div class="table-port">
        <el-table :data="tableData" border style="width:100%" >
          <el-table-column prop="sn_code" label="SN码" align="center" ></el-table-column>
          <el-table-column prop="create_time" label="添加时间" align="center"></el-table-column>
        </el-table>
        <!--分页 start-->
        <div  class="x-pagination" flex="main:right">
          <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="totalNum" @current-change="handleHandlePayCurrentChange"></el-pagination>
        </div>
        <!--分页 end-->
      </div>
      <!--table部分 end-->
    </div>

    <!--导入弹出框 start-->
    <div class="import-dialog" v-show="importDialog">
      <transition name="scale-show">
        <div class="import-content" v-show="importDialog">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="选择EXCEL文件">
              <el-button size="small" @click="chooseUpload">选择文件</el-button>
              <span>{{file_name}}</span>
              <input type="file" name="excel" id="uploadExcel" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ref="uploadExcel" @change="changeFile" style="display: none;">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="next">确定导入</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <!--导入弹出框 end-->
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
        form:{},
        file_name:"",//返回的文件名
        excelFile : null,
        tableData: [],
        searchValue: '',// 输入查找的sn码

        dialogVisible:false,//是否显示弹出框
        snCode:'',//输入的 sn码
        importDialog:false,// 导入弹框

        pageSize:3, // 每一页显示数据条数
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
        'operateSearchServer',//运营操作搜索接口
        'sncodeAddServer',// 添加单条sn码
        'sncodeGetexeclServer',//下载excel模板 (1 下载模板 2下载sn码)
      ]),
      /**
       *  添加单条sn码 接口
       * */
      sncodeAdd(){
        if(!this.searchValue){
          this.$message({message:'请输入正确sn码',type:'warning'});
          return false;
        }
//        NProgress.start(); // 页面切换，显示加载条
        this.sncodeAddServer({

        }).then(res=>{
          if(res.success){
//            NProgress.done(); // 页面切换，显示加载条
            this.$message({message:'请输入正确sn码',type:'success'});
            this.dialogVisible =true;
          }
        })
      },
      /**
       *下载模板 或 sn码 (1 为 下载模板 2为 下载全部sn码)
       * */
      sncodeGetexecl(data){
        this.sncodeGetexeclServer({data}).then(res=>{
          if(res.success){
            window.open( process.env.API+'/' + res.data.down_url);
          }
        })
      },
      /**
       *  点击确认按钮 确定上传sn码
       * */
      confirmCode(){
        this.sncodeAdd();
      },
      /**
       *  运营操作搜索接口 数据
       * */
      operateSearch(){
//        NProgress.start(); // 页面切换，显示加载条
        this.operateSearchServer({
          data:'1'
        }).then(res=>{
//          NProgress.done(); // 页面切换，显示加载条
          this.tableData = res.data.list;
          this.totalNum = +res.data.total;
        })
      },
      /**
       * 查找按钮
       * */
      searchSNCode(){
        this.operateSearch();
      },
      /**
       *  添加sn码
       * */
      addSNCode(){
        this.dialogVisible=true;
      },
      /**
       * 批量导入sn码
       * */
      exportSNCode(){
        this.importDialog =true;
      },
      /**
       * 触发文件选择事件
       */
      chooseUpload() {
        this.$refs.uploadExcel.click();
      },
      /**
       * 显示文件名
       * */
      changeFile(e) {
        if(!/\.(xls|xlsx|XLS|XLSX)$/.test(this.$refs.uploadExcel.files[0].name)) {
          this.$message({
            message: '请选择EXCEL文件',
            type: 'warning'
          });
          return false;
        }
        this.file_name = this.$refs.uploadExcel.files[0].name;
        this.excelFile = e.target.files[0] || e.dataTransfer.files[0];
      },
      /**
       *
       * 确定导入（进入导入确认）
       */
      next() {
        /*
        * 实例化一个表单数据对象
        * */
        var formData = new FormData();
        /*
        *  遍历图片文件列表，插入到表单数据中
        * */
        console.log(this.excelFile);
        formData.append("file", this.excelFile);
        /*
        *  提示信息，当没有上传文件时，警告提示
        * */
        if(!this.excelFile) {
          this.$message({
            message: '请选择文件',
            type: 'warning'
          });
          return false;
        }
      },
      /**
       *  返回
       * */
      back(){
        this.importDialog =false;
      },
      /**
       * 下载excel模板
       * */
      loadExcelModel(){
        this.sncodeGetexecl({export_type:'1'});
      },
      /**
       * 下载全部SN码
       * */
      loadAllSNCode(){
        this.sncodeGetexecl({export_type:'2'});
      },
      /**
       *  关闭弹出框
       * */
      closeDialog(){
        this.dialogVisible=false;
      },
      /**
       *  分页 方法
       * */
      handleHandlePayCurrentChange(currentPage){
        this.chargePage = currentPage;
        this.operateSearch();
      },
    },
    watch:{
      snCode(val){
        this.snCode = val.replace(/\s+/g,'');
      },
      searchValue(val){
        this.searchValue = val.replace(/\s+/g,'');
      }
    }
  }
</script>

<style lang="scss">
  @import "sn-list.scss";
</style>
<style lang="scss">
  .import-sn-code{
    .el-dialog__footer{
      text-align: center;
    }
    .el-button{
      margin-right: 50px;
      margin-left: 0;
    }
    .el-button:nth-of-type(2){
      margin-right: 0;
    }


  }
  .table-port{
    .el-table--border  {
      /*border-right: 1px solid #e6ebf5 !important;*/
    }
  }

</style>
