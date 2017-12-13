<template>
  <section class="login-container" @keyup.enter="login">
    <div class="login-page-img"></div>
    <div class="login-form-box ">
      <div class="login-title">生活缴费总后台</div>
      <form action="" class="login-form">
        <div class="login-form-title">用户登录</div>
        <div class="login-input-item ">
          <label for="username" class="people-icon " style="margin-right: 9px;"></label>
          <input type="text" id="username" v-model="username" class="login-input" placeholder="请输入用户名">
        </div>
        <div class="login-input-item  margin-top-20">
          <label for="password" class="lock-icon pos-relative"></label>
          <input type="password" id="password" v-model="password" class="login-input" placeholder="请输入密码">
        </div>
        <div class="login-input-verify margin-top-20">
          <div class="login-verify">
            <label for="password" class="lock-icon"></label>
            <input type="password" id="verify" v-model="verify" class="login-input" placeholder="请输入验证码">
          </div>
          <img class="verify-img" :src="verifyImg" alt="获取图片失败">
        </div>
        <div class="margin-top-20">
          <el-button type="primary" class="login-btn"  @click="login">登录</el-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  import publicMixin from 'src/mixins/publicMixin'
  import { mapGetters, mapActions } from 'vuex';
  let countTimeLogin;
  // 引入表单验证
  import validation from 'src/mixins/validation'
  import asyncRouter from 'src/router/routes'
  export default {

    mixins: [publicMixin,validation],
    data(){
      return {
        username: '',//用户名
        password: '',//密码
        verify:'',//验证码
        verifyImg:'',//验证码图片
        list:[
          {
            title: '用户列表',
            path: '/home',
            name: 'home'
          },
          {
            title: '用户列表',
            path: '/account/user-list',
            name: 'userList'
          },
          {
            title: '用户编辑',
            path: '/account/user-list/user-edit',
            name: 'userEdit'
          },
        ]
      }
    },
    methods: {
      ...mapActions([
        'loginServer',//登陆接口
        'updatePermissionList'
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
            this.routerMatch(this.list).then((res)=>{
              let originPath = res.concat([{
                path: '*',
                redirect: '/404'
              }]);
              this.$router.addRoutes(originPath);
              this.updatePermissionList({
                routesList : this.list,
                permissionList : originPath
              });
              this.$router.push({ name: 'home' });
            });

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
      /**
       * 遍历路由表，筛选与权限列表符合的路由
       * */
      routerMatch(permission){
        return new Promise((resolve) => {
          // 这里需要获取完整的已经编译好的router对象，不可为空数组，也不能用类router的对象。因为当程序运行到这里时，vue-router已经解析完毕
          const routers = asyncRouter[0];

          this.transformationToHash(permission).then((res)=>{
            asyncRouter.forEach((d,i)=>{
              console.log(d);
              if(res[d.path]){
                routers.children.push(d);
              }
            })
          });
          resolve([routers])
        })
      },
      /**
       * 将接收到的权限列表转成对象
       * */
      transformationToHash(data){
        return new Promise((resolve) => {
          let hashRoutes = {};
          data.forEach((d)=>{
            hashRoutes[d.path] = true;
          });
          resolve(hashRoutes);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "login.scss";
</style>
