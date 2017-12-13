/**
 * 改变状态的唯一方式， 根据指令来更新数据，这是个同步的事务。
 * create by ZC 2016/10/16
 * */

import * as utils from 'src/utils/util'
import * as types from './types'
import * as actions from './actions'
import * as getters from './getters'

// 当页面刷新后，首先从本地获取数据
const localData = JSON.parse(utils.getSessionData("userInfo"));
const state = Object.assign({
    username : 'admin',
    password : ''
}, localData);

const mutations = {
    /**
     * 更新用户基本信息
     * @param state 状态
     * @param data 获得的数据
     * */
    [types.UPLOAD_USER_INFO] (state, data) {
        try {
            Object.assign(state, data);
            // 更新后的数据存储到本地
            utils.setSessionStorage('userInfo',state);
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
