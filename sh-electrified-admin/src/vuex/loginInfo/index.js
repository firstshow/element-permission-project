/**
 * Created by guoxiaolin on 2017/6/24.
 */

import {saveToSession , saveToLocal} from '../dataHandle'
import * as types from './types'
import * as actions from './actions'
import * as getters from './getters'

// 当页面刷新后，首先从本地获取数据

const localData = JSON.parse(window.localStorage.getItem("registerInfo"));
// console.log(localData);

const state = Object.assign({
  registerInfo: {
    username: '', // 登录名
    password: '', // 密码
    access:'',//
    id:'',//
    left_menu:{},// 左侧导航栏
    top_menu:{},// 顶部导航栏
  }
}, localData);

const mutations = {
  /**
   * 更新 左侧菜单栏
   * @param state 状态
   * @param data 获得的数据
   * */
  [types.SAVE_LEFT_MENU] (state, data) {
    try {
      Object.assign(state.registerInfo, data);
      saveToLocal('registerInfo',state);
    } catch (err) {
      console.log("存储错误："+err)
    }
  },

  /**
   * 更新登录信息
   * @param state 状态
   * @param data 获得的数据
   * */
  [types.SAVE_LOGIN_INFO] (state, data) {
    try {
      Object.assign(state.registerInfo, data);
      saveToLocal('registerInfo',state);
    } catch (err) {
      console.log("存储错误："+err)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
