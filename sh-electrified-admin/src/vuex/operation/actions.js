/**
 * Created by guoxiaolin on 2017/6/22.
 */

import * as types from './types'
import xAjax from './../../util/xAjax'



/**
 * 运营操作搜索接口
 * @returns {Promise}
 */
export const operateSearchServer = ({ commit },data ) => {
  return new Promise((resolve, reject) => {
    xAjax('/operateSearch', 'POST', data, res => {
      resolve(res); // 将接收到的数据，传回给页面
    })
  })
}

