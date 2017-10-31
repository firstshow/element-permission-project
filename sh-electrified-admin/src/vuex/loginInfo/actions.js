/**
 * Created by guoxiaolin on 2017/6/22.
 */

import * as types from './types'
import xAjax from './../../util/xAjax'


/*/!**
 * 存储登录信息，用于一键登录
 * @param commit
 * @param data
 *!/
export const saveLoginInfoServer = ({ commit },data ) => {
  return new Promise((resolve, reject) => {
    xAjax('/login/community-login', 'POST', data, res => {
      if (res.success) {
        // commit(types.UPDATE_USER_INFO, res.data); // 发送指令，存储数据
      }
      resolve(res); // 将接收到的数据，传回给页面
    })
  })
}*/


/**
 * 请求登录
 * @param commit
 * @param data.name 登录名
 * @param data.password 密码
 * @param data.auto_login 自动登录
 * @returns {Promise}
 */
export const loginServer = ({ commit },data ) => {
  // data.password = md5(data.password);
  return new Promise((resolve, reject) => {
    xAjax('/admin/login/index', 'POST', data, res => {
      // commit(types.GET_LOGIN_INFO, res.data); // 发送指令，存储数据
      resolve(res); // 将接收到的数据，传回给页面
    })
  })
}


/**
 * 退出登录
 * @returns {Promise}
 */
export const loginoutServer = ({ commit },data ) => {
  // data.password = md5(data.password);
  return new Promise((resolve, reject) => {
    xAjax('/admin/user/loginout', 'POST', data, res => {
      resolve(res); // 将接收到的数据，传回给页面
    })
  })
}

/**
 * 退出登录
 * @returns {Promise}
 */
export const getcodeServer = ({ commit },data ) => {
  // data.password = md5(data.password);
  return new Promise((resolve, reject) => {
    xAjax('/admin/login/getcode', 'GET', data, res => {
      resolve(res); // 将接收到的数据，传回给页面
    })
  })
}

/**
 * 上部菜单栏控制左侧菜单栏
 * @returns {Promise}
 */
export const getMenuServer = ({ commit },data ) => {
  // data.password = md5(data.password);
  return new Promise((resolve, reject) => {
    xAjax('/getMenu', 'POST', data, res => {
      resolve(res); // 将接收到的数据，传回给页面
    })
  })
}
/**
 *  保存 登录状态信息
 * */
export const saveLoginInfoServer = ({commit},data)=>{
  commit(types.SAVE_LOGIN_INFO, data); // 发送指令，存储数据
}
/**
 *  保存 左侧菜单栏
 * */
export const saveLeftMenuServer = ({commit},data)=>{
  commit(types.SAVE_LEFT_MENU, data); // 发送指令，存储数据
}
