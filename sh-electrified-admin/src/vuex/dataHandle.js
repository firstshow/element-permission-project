/**
 * 一些重要信息 存储到local或session中，刷新后vuex中数据从本地进行获取
 * create by ZC 2016/10/16
 * */

let localStorage = window.localStorage;
let sessionStorage = window.sessionStorage;

/**
 * 将更新后的信息，存储到localStorage中
 * 及需要永久保存在本地的数据 关闭浏览器后也还存在的
 * */
export const saveToSession = (key,value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 将更新后的信息，存储到localStorage中
 * 及需要暂时保存在本地的数据 关闭浏览器后及清除
 * */
export const saveToLocal = (key,value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
