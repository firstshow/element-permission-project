<template>
  <section class="login-container" @keyup.enter="login">
    <div class="login-page-img"></div>
    <div class="login-form-box ">
      <div class="-title color-blue">用户登录</div>
      <form action="" class="login-form">
        <div class="login-input-item bg-white margin-top-20">
          <label for="username" class="people-icon pos-relative"></label>
          <input type="text" id="username" v-model="username" class="login-input" placeholder="输入用户名">
        </div>
        <div class="login-input-item bg-white margin-top-20">
          <label for="password" class="lock-icon pos-relative"></label>
          <input type="password" id="password" v-model="password" class="login-input" placeholder="密码">
        </div>
        <div class="login-input-item bg-white margin-top-20">
          <label for="password" class="lock-icon pos-relative"></label>
          <input type="password" id="verify" v-model="verify" class="login-input" placeholder="验证码">
        </div>
        <div class="margin-top-20">
          <el-button type="primary" class="login-btn"  @click="login">登录</el-button>
        </div>
      </form>
    </div>

    <div class="login-footer text-center padding-top-20">
      <span>Copyright © 2014 友店 - 浙ICP备13030782号 地址：杭州市西湖区池华街与紫萱路交叉口丰盛九玺东区12幢18-22层</span>
    </div>
  </section>
</template>

<script>
  import ajaxMixin from './../mixins/ajaxMixin' // 引入ajax错误处理
  import xAjax from './../util/xAjax' // 引入ajax错误处理
  import { mapGetters, mapActions } from 'vuex';
  import { Loading } from 'element-ui';
  let countTimeLogin;
  // 引入表单验证
  import validation from './../mixins/validation'
  export default {
    mixins: [ajaxMixin,validation],
    data(){
      return {
        username: '',//用户名
        password: '',//密码
        verify:'',//验证码
      }
    },
    methods: {
      ...mapActions([
        'loginServer',
        'saveLoginInfoServer'
      ]),
      checkInfo(){
        if(!/^(\w|[\u4e00-\u9fa5]){1,16}$/.test(this.username)){
          this.$message({
            message: '请输入正确的用户名',
            type: 'warning'
          });
          return false;
        } else if(!/^\w{6,20}$/.test(this.password)){
          this.$message({
            message: '请输入6-20位的密码',
            type: 'warning'
          });
          return false;
        }

        return true;
      },
      /**
       * 登录
       */
      login() {
        if(!this.checkInfo()){
          return;
        }
        this.loginServer({
          username: this.username,
          password: this.password,
          auto_login: this.auto_login ? 1 : 0
        }).then((res)=>{
          if(res.success){
            this.saveLoginInfoServer({
              username: res.data.username, // 登录名
              access:res.data.access,//
              id:res.data.id,//
              left_menu:res.data.auth_list.left_menu,// 左侧导航栏
              top_menu:res.data.auth_list.top_menu,// 顶部导航栏
            });
            this.$router.push({ name: 'home' });
          }else{
            if(res.code === "2001"){
              this.untreatedPhoneNumber = parseInt(res.data.cellphone);
              var num = res.data.cellphone;
              this.verifyPhoneNumber = num.substr(0,3)+"****"+num.substr(7);
              this.sLoginDialog = true;
              this.getVerifyCode();
            }else{
              this.handleError(res);
            }
          }
        })
      },
      /**
       * 获取验证码 cjm
       */
      getVerifyCode(){
        this.whetherClick = true;
        this.getPhoneValidatorServer({ cellphone: this.untreatedPhoneNumber}).then((res) => {
//                this.getPhoneValidatorServer({ cellphone: 17682342855}).then((res) => {
          if(res.success && (this.disabled === true)){
            this.disabled = false;
            this.secondTime();
          }
        })
      },
      /*
       *  倒计时方法
       * */
      secondTime(){
        let that = this;
        let totalTime = 60;
        countTimeLogin = setInterval(function(){
          if(totalTime <= 0) {
            that.disabled = true;
            that.whetherClick = false;
            that.sGetVerifyCode = "获取验证码";
            clearInterval(countTimeLogin);
          } else {
            totalTime--;
            that.sGetVerifyCode = totalTime+ "秒后重新发送";
          }
        },1000);
      },

      /*
      * 点击X按钮
      * */
      handleClose(){
        this.sLoginDialog = false;
        this.phoneValidator = '';
        this.disabled = true;
        clearInterval(countTimeLogin);
        this.whetherClick = false;
        this.sGetVerifyCode = "获取验证码";
      },
      /*
      *   点击 确认按钮 cjm
      * */
      affirm(){
        if( this.validateEmpty(this.untreatedPhoneNumber)) {
//                if( this.validateEmpty(17682342855)) {
          this.confirmTwoServer({
            cellphone: this.untreatedPhoneNumber,
//                        cellphone: 17682342855,
            code: this.phoneValidator
          }).then((res) => {
            if(res.success) {
              this.sLoginDialog = false;
              this.sResetPassword = true; // 重置密码 弹框 出现
            } else {
              this.$message.error('验证码错误');
            }
          })
        } else {
          this.handleError({message: "手机验证码不能为空"});
          this.$message.error('验证码不能为空');
        }
      },
      /*
      *  取消重置密码 cjm
      * */
      sCancelReset(){
        this.sResetPassword = false ;
      },
      /*
       *  重置密码 cjm
       * */
      sToReset(){
        this.$router.push({
          name: 'findPassword',query: {step:2, username:this.username}  //
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/modules/login.less";
</style>
<style lang="less">

</style>
