import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import {pageRoutes} from './routes'

import store from './../vuex/store'
import {saveLoginInfoServer} from './../vuex/loginInfo/actions'

import { Message } from 'element-ui';

/**
 * 定义（路由）组件。
 * 从其他文件 引入 进来
 * 使用下面这种方式来加载组件,而不用import ，是因为 这样可以实现路由懒加载,分js打包,按需加载
 * 在build后 会有多个小js 文件
 * */

// 基础路由 有底部导航栏的入口
const App = resolve => require(['./../App.vue'], resolve)
const Index = resolve => require(['./../views/index.vue'], resolve)
// 登录页路由
const login = resolve => require(['./../views/login.vue'], resolve)

/**
 * 加载路由插件
 * */
Vue.use(VueRouter);

// 去除加载条的转圈动画
NProgress.configure({ showSpinner: false , speed: 1000});

/**
 * 定义路由 routes` 配置
 */
const routes = [
  {
    path: '/',
    name : 'index',
    component: Index,
    redirect: '/login',
    children : pageRoutes
  },
  /**
   * 登录
   */
  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      if(to.query.token) {
        saveLoginInfoServer(store, {
          token: to.query.token
        }).then((res)=>{
          if(res.success) {
            next({ name: 'home' })
          } else {
            Message({
              message: res.message,
              type: 'warning'
            })
            next();
          }
        })
      } else {
        next();
      }
    }
  },
]

/**
 * 创建 router 实例，然后传 `routes` 配置
 * */
const router = new VueRouter({
  mode: 'hash',
  routes ,// 注入路由
})

/**
 * 当用户信息中没有token时，则用户未登录
 * 跳转到登录页面
 * */
router.beforeEach(({meta, path}, from, next) => {
  // let dontNeedLogin = path == '/login' || path == '/findPassword'
  // let hasLoginTrace = store.state.userInfo && store.state.userInfo.access_token
  // // 需要登录 但 本地没有 登录信息
  // if (!dontNeedLogin && !hasLoginTrace) {
  //   return next({ path: '/login' })
  // }
  NProgress.start(); // 页面切换，显示加载条
  next()
})

/**
 * 路由跳转成功之后
 * */
router.afterEach(({meta, path}, from, next) => {
  NProgress.done(); // 隐藏加载条
})

export default router
