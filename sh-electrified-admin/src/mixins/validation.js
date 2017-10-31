/**
 * 表单验证组件的混合
 * */

export default {
    data() {
        return {

        }
    },
    methods: {
        /**
         * 判空
         * @param val 值
         * @param name 字段名
         */
        validateEmpty(val) {
            if(!val) {
                return false;
            }
            return true;
        },

        /**
         * 验证字符串长度
         * @param val
         * @param minLength 最小长度
         * @param maxLength 最大长度
         */
        validateStringLength(val, minLength, maxLength) {
            if(minLength == 0) { // 如果最小长度等于零，表示最小长度无限制
                if (val.length > maxLength)
                    return false;
            } else if(maxLength == 0) { // 如果最大长度等于零，表示最大长度无限制
                if(val.length < minLength)
                    return false;
            } else {
                if (val.length > maxLength || val.length < minLength)
                    return false;
            }
            return true;
        },
        /**
         * 判断手机号码：
         * 验证130-139,150-159,180-189, 170-179号码段的手机号码
         * @param val
         */
        validateMobile(val) {
            let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if(!phoneReg.test(val)){
                return false;
            }
            return true;
        },
        /**
         * 验证电子邮箱
         * @param val
         */
        validateEmail(val) {
            let emailReg = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
            if(!emailReg.test(val)) {
                return false;
            }
            return true;
        },
        /**
         * 验证正小数（正数，小数点后不超过两位）
         * @param val
         */
        validatePositiveFloat(val) {
            let floatReg = /^\d+(\.\d{0,2})?$/;
            // /^\d+(\.\d{2})?$/
            if(!floatReg.test(val) || parseFloat(val).toFixed(2)<=0.00) {
                return false;
            }
            return true;
        },
        /**
         * 验证正整数
         * @param val
         */
        validatePositiveInt(val) {
            let intReg = /^[0-9]*[1-9][0-9]*$/;
            if(!intReg.test(val) || parseInt(val)<=0) {
                return false;
            }
            return true;
        },
        /**
         * 验证密码格式
         * @param val
         */
        validatePassword(val) {
            if(val.length<6 || val.length>20){
                return {error: 1, msg: '密码长度小于6或小于20位'}
            } else {
                // 不允许有空格，不能为纯数字或纯字母
                let reg1 =  /(^([a-zA-Z]+[0-9]+)$)|(^[0-9]+[a-zA-Z]+$)/;
                if(!reg1.test(val)) {
                    return {error: 1, msg: '有空格或者为纯数字或纯字母'}
                }
                // 长度为6~14个字符,支持数字/大小写字母/标点符号,不允许有空格
                let reg2 = /^[\\p{Punct}a-zA-Z0-9]{6,20}$/;
                if(!reg2.test(val)) {
                    return {error: 1, msg: '密码支持数字/大小写字母/标点符号'}
                }
            }
            return {error:0}
        }
    }
}
