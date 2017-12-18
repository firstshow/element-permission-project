'use strict'

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

/**
 * 请求拦截器
 * 可以把请求前的数据做处理
 */
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 * 可以对响应的数据做拦截，如做统一的错误处理
 */
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

/**
 * 判断请求是否成功，如果失败则给出对应提示
 * @param response 请求数据
 */
function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    return response.data
  }
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  statusErrorHandle(response)
}

/**
 * 当请求成功时候，对于业务逻辑做判断
 * @param res 请求成功后返回的接口数据
 * @returns {*}
 */
function checkCode (res) {
  // 请求成功，但是业务逻辑出错情况下，给出对应提示
  if (res && res.bizResponse.resultCode === 'FAIL') {
    codeErrorHandle(res)
  }
  return res.bizResponse
}

/**
 * 当请求出现问题时候做的处理，把错误请求信息展示
 * @param res 返回的信息
 */
function statusErrorHandle (res) {
  console.log(res)
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  Message({
    message: '错误status:' + res.status + ';错误信息:网络异常',
    type: 'warning'
  })
}

/**
 * 当请求成功，但是出现了业务层面错误时候，给出对应的错误处理
 * @param res 返回的信息
 */
function codeErrorHandle (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  Message({
    message: res.bizResponse.errorMsg,
    type: 'warning'
  })
}

export default {
  /**
   * post 请求
   * @param url
   * @param data
   * @param contentType 请求类型，默认是from ，可以定义为 json
   * @returns {Promise.<TResult>}
   */
  post (url, data, contentType = 'application/x-www-form-urlencoded; charset=UTF-8') {
    return axios({
      method: 'post',
      baseURL: process.env.API,
      url,
      data: (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') ? qs.stringify(data) : data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  /**
   * get 请求
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: process.env.API,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
