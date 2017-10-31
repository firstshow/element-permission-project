/**
 * 异步逻辑封装在action 中 ， 发送指令 ， 改变状态
 * create by ZC 2016/10/16
 * */
import * as types from './types'

/**
 * 更新登录账号、密码信息
 * */
export const uploadUserInfoServer = ({ commit },data ) => {
  commit(types.UPLOAD_USER_INFO, data); // 发送指令，存储数据
}
