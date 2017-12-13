/**
 * 应用级的状态集中放在 store 中
 * create by ZC 2016/10/16
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo/'
/**
 * 注册Vuex插件
 * */
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    userInfo
  },
  strict: process.env.NODE_ENV !== 'production' // 当开发模式时候，启用严格模式
})
