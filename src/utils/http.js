/**
 * Created by zc on 2017/7/22.
 */
import axios from  'axios'
import Vue from 'vue'
let http = {};

/**
 * 全局默认配置
 * */
// 设置请求基础url
axios.defaults.baseURL = process.env.API;
/**
 * 封装的get请求
 * @param url 请求接口
 * @param params get的请求参数，跟在url后面的参数
 * */
http.get = (url, params) =>{
  return axios.get(url, { params })
    .then((response) => response.data)
    .catch(error => error);
}

/**
 * 封装的post请求
 * @param url 请求接口
 * @param body post请求 放在body中的参数
 * */

http.post = (url,body) => {
  return axios({
    method: 'post',
    url: url,
    data: body,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],

  }).then((response) =>response.data)
    .catch(error => error);
}

Vue.prototype.http = http;
export default http;

