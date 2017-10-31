/**
 * 定义（路由）组件。
 * 从其他文件 引入 进来
 * 使用下面这种方式来加载组件,而不用import ，是因为 这样可以实现路由懒加载,分js打包,按需加载
 * 在build后 会有多个小js 文件
 * */
// 引入首页路由
const home = resolve => require(['./../views/homePage/home'], resolve)

//运营操作首页
const operationHomePage = resolve=>require(['./../views/operation/index'],resolve)

export const pageRoutes = [
  /**
  * 首页
  * */
  {
    path: '/home',
    name : 'home',
    component: home,
  },
  /**
   * 运营操作首页
   * */
  {
    path: '/operationHomePage',
    name : 'operationHomePage',
    component: operationHomePage,
  },
]
