import Vue from 'vue'
/**
 * 定义全局函数，或者单独引用
 * */

/**
 * 微信浏览器中设置对应页面的标题
 * 解决：IOS微信浏览器中用document.title 设置标题无效
 * */
export const setTitle = (title) => {
    var body = document.getElementsByTagName('body')[0];
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.baidu.com/img/baidu_jgylogo3.gif");
    iframe.setAttribute("style", "display:none");
    iframe.addEventListener('load', function() {
        setTimeout(function() {
            try{
                iframe.removeEventListener('load');
            }catch (err){}
            document.body.removeChild(iframe);
        }, 0);
    });
    try{
        document.body.appendChild(iframe);
    }catch (err){}
}

/**
 * 是否对象为空（没有属性值）
 * @param e
 * @returns {boolean}
 */
export const isEmptyObject = (e) => {
    var t;
    for (t in e)
        return !1;
    return !0
}

/**
 * 对象的深拷贝
 * @param source 需要深拷贝的对象
 * @returns {object}
 */
export const objDeepCopy = (source) => {
    let sourceCopy = {};
    for (let item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    return sourceCopy;
}

/**
 * 对象数组的深拷贝
 * @param source 需要深拷贝的对象
 * @returns {object}
 */
export const objArryDeepCopy = (source) => {
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objArryDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}

/**
 * 定义全局函数
 * */
Vue.prototype.setTitle = setTitle;
Vue.prototype.objDeepCopy = objDeepCopy;
Vue.prototype.objArryDeepCopy = objArryDeepCopy;
