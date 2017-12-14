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
          setTimeout(()=>{
            this.$router.replace(toPath);
          },1000)
        });
      },
      /**
       * 初始化路由列表，当页面刷新的时候促发该函数，把有权限的路由进行加载
       * 当已经登录，并且当有权限列表的时候，加载路由；
       * 登录了，但是没有了权限列表，则获取权限列表；
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
      /**
       * 筛选权限列表，权限列表中拥有的权限，把对应的路由动态放到数组，再返回
       * @param permission 权限列表
       * */
      routerMatch(permission){
        return new Promise((resolve) => {
          // 这里需要获取完整的已经编译好的router对象，不可为空数组，也不能用类router的对象。因为当程序运行到这里时，vue-router已经解析完毕
          const routers = asyncRouter[0];

          this.transformationToHash(permission).then((res)=>{
            routers.children = [];
            for(let i = 0,length = asyncRouter.length;i<length;i++){
              let item = asyncRouter[i];
              if(res[item.path]){
                routers.children.push(item);
              }
            }
            asyncRouter.forEach((d,i)=>{

            })
          });
          console.log(routers);
          resolve([routers])
        })
      },
      /**
       * 将权限列表的数组转换成对象；如：
       * {
       *  '/home':true,
       *  '/account/userList':true
       * }
       * 当有权限的时候，为true；没有权限，则不在该对象中
       * 此函数中有三次循环，分别循环遍历一级目录(如：用户管理)，二级目录(如：用户列表)，及二级目录下面的所有子页面(如：新增用户、用户详情)
       * 将所有的路由循环后，进行动态加载
       * */
      transformationToHash(data){
        return new Promise((resolve) => {
          let hashRoutes = {};
          // 遍历一级目录
          for(let i = 0,parentNodeLength = data.length;i<parentNodeLength;i++){
            let parentNodeItem = data[i];
            if(parentNodeItem.children){
              // 遍历二级目录
              for(let j = 0,childrenNodeLength = parentNodeItem.children.length;j<childrenNodeLength;j++){
                let childrenNodeItem = parentNodeItem.children[j];
                if(childrenNodeItem.children){
                  // 遍历二级目录 下面的子路由
                  for(let k = 0,subChildrenNodeLength = childrenNodeItem.children.length;k<subChildrenNodeLength;k++){
                    let subChildrenNodeItem = childrenNodeItem.children[j];
                    hashRoutes[subChildrenNodeItem.path] = true;
                  }
                } else {
                  hashRoutes[childrenNodeItem.path] = true;
                }
              }
            } else {
              hashRoutes[parentNodeItem.path] = true;
            }
          }
          resolve(hashRoutes);
        });
      },
    }
  }
</script>

<style lang="scss">
  @import "styles/reset";
  @import "styles/theme";
  @import "styles/public";
</style>
