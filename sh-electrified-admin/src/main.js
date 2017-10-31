// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import ElementUI from  'element-ui'
// import components from './components/' //加载公共组件

import 'element-ui/lib/theme-chalk/index.css'


import App from './App'


Vue.config.productionTip = false

/**
 * 引入flex.css
 * 引入nprogress.css
 * 引入所有样式
 * */

import "./../src/assets/css/reset.less"
import "./../src/assets/css/tool.less"
import "./../src/assets/css/animation.less"
import "./../src/assets/css/index.less"

/**
 * 引入element-ui框架
 */
Vue.use(ElementUI);

/**
 * 全局引入自定义公共组件
 * 不用在页面中单个引入
 * */
// Object.keys(components).forEach((key) => {
//   var name = key.replace(/(\w)/, (v) => v.toUpperCase()); //首字母大写
//   Vue.component(`x${name}`, components[key])
// })
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
