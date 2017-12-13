<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'mechanism-list'}">机构列表 </el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'mechanism-power-list'}">权限列表</el-breadcrumb-item>
        <el-breadcrumb-item>缴费类型配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-body-content">
      <el-row>
        <el-col :span="12">
          <el-form label-position="right" label-width="130px">
            <el-form-item label="缴费类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.type_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input v-model="organiza_name" placeholder="机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构编号">
              <el-input v-model="organiza_number" placeholder="机构编号"></el-input>
            </el-form-item>
            <el-form-item label="条形码的识别规则">
              <el-input v-model="discern_rule" placeholder="条形码的识别规则"></el-input>
            </el-form-item>
            <el-form-item label="条形码总长度">
              <el-input v-model="code_length" type="number" placeholder="条形码总长度"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{id==''?"立即添加":"立即修改"}}</el-button>
              <el-button @click="goBack()">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
        id:'',// 当有id 为 修改  无新增
        organiza_name: '',//机构名称
        organiza_number: '',//机构编号
        discern_rule: '',//条形码的识别规则
        code_length:'',//条形码总长度
        options: [],
        value: ''
      }
    },
    methods: {
      ...mapActions([
        'changePayTypeServer',//增加修改缴费类型
        'getPayListServer',//获取缴费类型
        'getPayTypeContentServer',//获取修改缴费类型的内容
      ]),

      /**
      *  新增 修改
      * */
      onSubmit() {
        if(!this.value){
          this.$message({
            message:"请选择缴费类型",
            type:'warning'
          });
          return false;
        }
        if(!(this.organiza_name.replace(/\s+/g,''))){
          this.$message({
            message:"请填写机构名称",
            type:'warning'
          });
          return false;
        }
        if(!(this.organiza_number.replace(/\s+/g,''))){
          this.$message({
            message:"请机构编号",
            type:'warning'
          });
          return false;
        }
        if(!(this.discern_rule.replace(/\s+/g,''))){
          this.$message({
            message:"请填写条形码的识别规则",
            type:'warning'
          });
          return false;
        }
        if(!(this.code_length.replace(/\s+/g,''))){
          this.$message({
            message:"请填写条形码总长度",
            type:'warning'
          });
          return false;
        }
        this.changePayTypeServer({
          id:this.id,
          pay_type:this.value,
          organiza_name:this.organiza_name,
          organiza_number:this.organiza_number,
          discern_rule:this.discern_rule,
          code_length:this.code_length,
        }).then(res=>{
          if(res.success){
            this.$message({
              message:res.message,
              type:'success'
            });
            this.$router.push({ name: 'mechanism-power-list'});
          }
        })
      },
    },
    beforeRouteEnter(to,form,next){
      console.log(to);
      next(vm=>{
        vm.getPayListServer({
          id:1,
        }).then(res=>{
          if(res.success){
            vm.options = res.data.list;
            console.log(vm.options);
          }
        })
        if(!to.query.id){ // 当没有参数 即为增加
          console.log(to.query.id);

        }else{ // 当没有参数 即为修改
          console.log(to.query.id);
          vm.id = to.query.id;
          vm.getPayTypeContentServer({
            id:to.query.id
          }).then(res=>{
            vm.code_length =res.data.code_length;
            vm.discern_rule =res.data.discern_rule;
            vm.organiza_name =res.data.organiza_name;
            vm.organiza_number =res.data.organiza_number;
            if(res.success){
              if(res.data.pay_type==1){
                vm.value = "电费";
              }else if(res.data.pay_type==2) {
                vm.value = "水费";
              }else if(res.data.pay_type==3) {
                vm.value = "物业费";
              }
            }
          })
        }
      })
    },
    watch:{

    }
  }
</script>

<style lang="scss">
  @import "mechanism-power-edit.scss";
</style>
