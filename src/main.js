// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store'
import router from './router'
import 'flex.css';
import {Button,Select,Option,Pagination,Input,Tree,Table,TableColumn,Form,FormItem,Breadcrumb,BreadcrumbItem,Row,Col,Message,Menu,MenuItem,Submenu,MenuItemGroup,DatePicker,Tooltip,Upload} from 'element-ui'

/**
 * 按需引入element-ui组件
 * */
Vue.use(Upload);
Vue.use(Tree);
Vue.use(Tooltip);
Vue.use(DatePicker);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Row);
Vue.use(Col);
Vue.prototype.$message = Message;

Vue.use(Vuex);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
