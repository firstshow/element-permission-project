import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress';
import store from 'src/vuex/store'
import * as utils from 'src/utils/util'

/**
 * 定义（路由）组件。
 * 从其他文件 引入 进来
 * 使用下面这种方式来加载组件,而不用import ，是因为 这样可以实现路由懒加载,分js打包,按需加载
 * 在build后 会有多个小js 文件
 * */
// 登录页面
const Login = resolve => require(['../views/login/login.vue'], resolve);
// const Home = resolve => require(['../views/home/home.vue'], resolve);
// const Index = resolve => require(['../views/index.vue'], resolve);
// // 用户账号列表
// const UserList = resolve => require(['../views/account/user-list/user-list.vue'], resolve);
// // 用户账号信息编辑
// const UserEdit = resolve => require(['../views/account/user-list/user-edit/user-edit.vue'], resolve);
// // 管理员账号列表
// const ControllerList = resolve => require(['../views/account/controller-list/controller-list.vue'], resolve);
// // 管理员账号信息编辑
// const ControllerEdit = resolve => require(['../views/account/controller-list/controller-edit/controller-edit.vue'], resolve);
// // SN码列表
// const SnList = resolve => require(['../views/operation/sn-list/sn-list.vue'], resolve);
// // 机构列表
// const MechanismList = resolve => require(['../views/operation/mechanism-list/mechanism-list.vue'], resolve);
// // 权限列表
// const MechanismPowerList = resolve => require(['../views/operation/mechanism-list/mechanism-power-list/mechanism-power-list.vue'], resolve);
// // 缴费类型配置
// const MechanismPowerEdit = resolve => require(['../views/operation/mechanism-list/mechanism-power-list/mechanism-power-edit/mechanism-power-edit.vue'], resolve);

Vue.use(Router);


const baseRoutes = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login/login.vue'], resolve)
  },
  {
    path: '/',
    redirect: {
      name: 'login'
    },
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['../views/404/404.vue'], resolve)
  }
];



let router = new Router({
  mode: 'history',
  routes:baseRoutes
});


/**
 * 根据异步路由表中的path字段进行匹配，生成需要添加的路由对象
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter){
  return new Promise((resolve) => {
    // 这里需要获取完整的已经编译好的router对象，不可为空数组，也不能用类router的对象。因为当程序运行到这里时，vue-router已经解析完毕
    const routers = asyncRouter[0];
    // 创建路由
    function createRouter(permission){
      // 根据路径匹配到的router对象添加到routers中即可
      // 因permission数据格式不一定相同，所以不写详细逻辑了

      transformationToHash(permission).then((res)=>{
        asyncRouter.forEach((d,i)=>{
          if(res[d.path]){
            routers.children.push(d);
          }
        })
      });
    }
    createRouter(permission);
    resolve([routers])
  })
}

function transformationToHash(data){
  return new Promise((resolve) => {
    let hashRoutes = {};
    data.forEach((d)=>{
      hashRoutes[d.path] = true;
    });
    resolve(hashRoutes);
  });
}

/**
 * 当用户信息中没有token时，则用户未登录
 * 进入页面之前，显示进度条
 * 跳转到登录页面
 * */
router.beforeEach((to, from, next) => {
  next()
});

/**
 * 路由跳转成功之后，
 * 隐藏进度条
 * */
router.afterEach(({meta, path}, from, next) => {
  NProgress.done(); // 隐藏加载条
})

export default router;
