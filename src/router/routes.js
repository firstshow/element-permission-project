const asyncRouter = [
  {
    path: '/',
    name: 'index',
    component: (resolve) => require(['../views/index.vue'], resolve),
    redirect: {
      name: 'home'
    },
    children: []
  },
  {
    path: '/home',
    name: 'home',
    component: (resolve) => require(['../views/home/home.vue'], resolve),
  },
  // 账号管理路由
  {
    path: '/account/user-list',
    name: 'user-list',
    component: (resolve) => require(['../views/account/user-list/user-list.vue'], resolve),
  },
  {
    path: '/account/user-list/user-edit',
    name: 'user-edit',
    component: (resolve) => require(['../views/account/user-list/user-edit/user-edit.vue'], resolve),
  },
  {
    path: '/account/controller-list',
    name: 'controller-list',
    component: (resolve) => require(['../views/account/controller-list/controller-list.vue'], resolve),
  },
  {
    path: '/account/controller-list/controller-edit',
    name: 'controller-edit',
    component: (resolve) => require(['../views/account/controller-list/controller-edit/controller-edit.vue'], resolve),
  },
  // 运营操作
  {
    path: '/operation/sn-list',
    name: 'sn-list',
    component: (resolve) => require(['../views/operation/sn-list/sn-list.vue'], resolve),
  },
  {
    path: '/operation/mechanism-list',
    name: 'mechanism-list',
    component: (resolve) => require(['../views/operation/mechanism-list/mechanism-list.vue'], resolve),
  },
  {
    path: '/operation/mechanism-list/mechanism-power-list',
    name: 'mechanism-power-list',
    component: (resolve) => require(['../views/operation/mechanism-list/mechanism-power-list/mechanism-power-list.vue'], resolve),
  },
  {
    path: '/operation/mechanism-list/mechanism-power-list/mechanism-power-edit',
    name: 'mechanism-power-edit',
    component: (resolve) => require(['../views/operation/mechanism-list/mechanism-power-list/mechanism-power-edit/mechanism-power-edit.vue'], resolve),
  }
];

export default asyncRouter;
