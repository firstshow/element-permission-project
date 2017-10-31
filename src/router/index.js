import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress';

/**
 * 定义（路由）组件。
 * 从其他文件 引入 进来
 * 使用下面这种方式来加载组件,而不用import ，是因为 这样可以实现路由懒加载,分js打包,按需加载
 * 在build后 会有多个小js 文件
 * */
// 登录页面
const Login = resolve => require(['../views/login/login.vue'], resolve);
const Home = resolve => require(['../views/home/home.vue'], resolve);
const Index = resolve => require(['../views/index.vue'], resolve);
const UserList = resolve => require(['../views/account/user-list/user-list.vue'], resolve);
const UserEdit = resolve => require(['../views/account/user-list/user-edit/user-edit.vue'], resolve);
const ControllerList = resolve => require(['../views/account/controller-list/controller-list.vue'], resolve);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: 'home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/account/user-list',
          name: 'user-list',
          component: UserList
        },
        {
          path: '/account/user-list/user-edit',
          name: 'user-edit',
          component: UserEdit
        },
        {
          path: '/account/controller-list',
          name: 'controller-list',
          component: ControllerList
        },
      ]
    },

  ]
})

/**
 * 当用户信息中没有token时，则用户未登录
 * 进入页面之前，显示进度条
 * 跳转到登录页面
 * */
router.beforeEach(({meta, path}, from, next) => {
  NProgress.start(); // 页面切换，显示加载条
  next()
})

/**
 * 路由跳转成功之后，
 * 隐藏进度条
 * */
router.afterEach(({meta, path}, from, next) => {
  NProgress.done(); // 隐藏加载条
})

export default router;
