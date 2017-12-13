/**
 * Created by zc on 2017/7/22.
 */
import store from './../vuex/store'
import axios from  'axios'
import md5 from  'src/utils/md5'
let http = {};

/**
 * 全局默认配置
 * */
// 设置请求基础url
axios.defaults.baseURL = process.env.API;
// 设置请求头的access_token

// 设置post请求的类型
axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8';

/**
 * 封装的get请求
 * @param url 请求接口
 * @param params get的请求参数，跟在url后面的参数
 * */
http.get = (url,params) => {

  let signString = signMd5(params);
  params.sign = signString;
  // axios.defaults.headers.common['access-token'] = store.state.authorization.access_token;
  console.log(params);
  return axios.get(url,{params})
    .then((response) => response.data)
    .catch(error => error);
}

/**
 * 封装的post请求
 * @param url 请求接口
 * @param body post请求 放在body中的参数
 * */
http.post = (url,body) => {

  let signString = signMd5(body);
  // console.log(signString);
  // console.log(JSON.stringify(body)+store.state.authorization.access_token+'aQ5FGFUU6JB9hZMlmaY88g7hktFpMigR');

  body.sign = signString;
  // axios.defaults.headers.common['access-token'] = store.state.authorization.access_token;
  return axios.post(url,body)
    .then((response) => response.data)
    .catch(error => error);
}

/**
 * md5加密参数
 * @param val
 * @returns {*}
 */
function signMd5(val) {
  console.log(JSON.stringify(val));
  if(JSON.stringify(val).length == 2){
    let sign = md5(+'aQ5FGFUU6JB9hZMlmaY88g7hktFpMigR');
    // let sign = md5(store.state.authorization.access_token+'aQ5FGFUU6JB9hZMlmaY88g7hktFpMigR');
    return sign;
  }else {
    // let signString = md5(JSON.stringify(val)+store.state.authorization.access_token+'aQ5FGFUU6JB9hZMlmaY88g7hktFpMigR');
    let signString = md5('aQ5FGFUU6JB9hZMlmaY88g7hktFpMigR');
    return signString;
  }
}


export default http;
