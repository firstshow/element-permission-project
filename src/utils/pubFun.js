/**
 * Created by zc on 2017/7/24.
 */
import Vue from 'vue'

export const Error = (res)=>{
  if(res.error_code=-206){
    this.$message.error('登录失效，请重新登录');
    this.$router.push('');
  }
}
Vue.prototype.Error = Error;
