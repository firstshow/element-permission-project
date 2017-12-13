/**
 * 异步逻辑封装在action 中 ， 发送指令 ， 改变状态
 * create by ZC 2016/10/16
 * */
import * as types from './types'
import http from './../../../utils/http'

/**
 * 更新登录账号、密码信息
 * */
export const uploadUserInfoServer = ({ commit },data ) => {
  commit(types.UPLOAD_USER_INFO, data); // 发送指令，存储数据
}


/**
 * 请求登录
 * @param commit
 * @param data.name 登录名
 * @param data.password 密码
 * @param data.auto_login 自动登录
 * @returns {Promise}
 */
export const loginServer = ({ commit },data ) => {
  return http.post('/admin/login/index' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 退出登录
 * @returns {Promise}
 */
export const loginoutServer = ({ commit },data ) => {
  return http.post('/admin/user/loginout' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}
/**
 * 获取验证码
 * @returns {Promise}
 */
export const getcodeServer = ({ commit },data ) => {
  return http.get('/admin/login/getcode' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}


/**
 * 运营操作搜索接口
 * @returns {Promise}
 */
export const operateSearchServer = ({ commit },data ) => {
  return http.post('/admin/sncode/index' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 添加单条sn码
 * @returns {Promise}
 */
export const sncodeAddServer = ({ commit },data ) => {
  return http.post('/admin/sncode/add' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 下载excel模板 (1 下载模板 2下载sn码)
 * @returns {Promise}
 */
export const sncodeGetexeclServer = ({ commit },data ) => {
  return http.get('/admin/sncode/getexecl' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 机构配置列表
 * @returns {Promise}
 */
export const getConfigListServer = ({ commit },data ) => {
  return http.post('/config/getConfigList' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}
/**
 * 权限配置列表
 * @returns {Promise}
 */
export const getJurisdicConfigListServer = ({ commit },data ) => {
  return http.post('/config/getJurisdicConfigList' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}
/**
 * 删除权限匹配
 * @returns {Promise}
 */
export const deleteJurisdicConfigServer = ({ commit },data ) => {
  return http.post('/config/deleteJurisdicConfig' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 增加修改缴费类型
 * @returns {Promise}
 */
export const changePayTypeServer = ({ commit },data ) => {
  return http.post('/config/changePayType' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 获取缴费类型
 * @returns {Promise}
 */
export const getPayListServer = ({ commit },data ) => {
  return http.post('/config/getPayList' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}

/**
 * 获取修改缴费类型的内容
 * @returns {Promise}
 */
export const getPayTypeContentServer = ({ commit },data ) => {
  return http.post('/config/getPayTypeContent' , data).then(response=>{
    // commit(types.REGISTER_INFO_SECOND, res); // 发送指令，存储数据
    return response;
  }).catch(error=>error);
}
