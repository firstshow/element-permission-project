<template>
  <div class="x-header">
    <div class="type-page">
      <el-row class="header">
        <el-col :span="12">
          <div class="text-left">
            <!--<img class="v-align-m" src="../../assets/icon/logo.png" alt="">-->
            <span class="head-name" style="">商户池管理后台</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text-right">
            <ul class="account">
              <li class="name">
                <i class="name-icon icon-style"></i>
                <span>{{userInfo.username}}</span>
                <!--<div class="trangle"></div>-->
              </li>
              <li @click="outLog" class="cursor-pointer">
                <i class="out-icon icon-style"></i>
                <span>退出</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'header',
    data () {
      return {
        msg: ''
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    methods: {
      outLog(){
        this.http.post("pool/logout", {}).then(
          res => {
            if (res.success) {
              this.$message.success('退出成功');
              this.$router.push({name:'login'})
            } else {
              this.handleError(res);
//                  this.$message.error('退出失败');
            }
          }, error => {
            this.$message.error('退出失败');
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "index.scss";

  .h-name {
    margin-left: 35px;
    font-size: 14px;
  }

  a {
    color: #42b983;
  }
</style>
