<template>
  <div class="x-main-section">
    <router-view @login="loginDirect"/>
  </div>
</template>

<script>
  import asyncRouter from 'src/router/routes'
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'app',
    data(){
      return {
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
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },
    created: function(newPath) {
      this.initRoutesList();
    },
    mounted() {
      this.appShow();
    },
    methods: {
      /**
       * 初始加载时候的loading动画
       * */
      appShow() {
        const END_TIME = new Date().getTime() //结束时间
        const diffTime = END_TIME - PAGE_START_TIME
        const timer = setTimeout(() => {
          clearTimeout(timer)
          document.querySelector('#loading').className += ' app-loading-hide'
        }, diffTime > 1000 ? 0 : 1000 - diffTime)
      },
      /**
       * 登录页面，输入账号密码点击登录
       * 促发该函数，动态加载路由
       * @param toPath 登录成功后需要跳转到的路由
       * */
      loginDirect(toPath){
        this.routerMatch(this.userInfo.routesList).then((res)=>{
          let originPath = res.concat([{
            path: '*',
            redirect: '/404'
          }]);
          this.$router.addRoutes(originPath);
          this.$router.replace(toPath);
        });
      },
      /**
       * 初始化路由列表，当页面刷新的时候促发该函数，把有权限的路由进行加载
       * */
      initRoutesList(){
        if(this.userInfo.routesList.length){
          this.routerMatch(this.userInfo.routesList).then((res)=>{
            let originPath = res.concat([{
              path: '*',
              redirect: '/404'
            }]);
            this.$router.addRoutes(originPath);
          });
        }
      },
      routerMatch(permission){
        return new Promise((resolve) => {
          // 这里需要获取完整的已经编译好的router对象，不可为空数组，也不能用类router的对象。因为当程序运行到这里时，vue-router已经解析完毕
          const routers = asyncRouter[0];

          this.transformationToHash(permission).then((res)=>{
            routers.children = [];
            asyncRouter.forEach((d,i)=>{
              if(res[d.path]){
                routers.children.push(d);
              }
            })
          });
          console.log(routers);
          resolve([routers])
        })
      },
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

<style lang="scss">
  @import "styles/reset";
  @import "styles/theme";
  @import "styles/public";
</style>
