/**
 * ajax异步组件的混合
 * */

export default {
  data() {
    return {}
  },
  methods: {
    /**
     * 跳转到用户编辑页面
     * @param name 路由名称
     * @param params 跳转路由的参数
     * */
    goNextPage(name, query, params) {
      this.$router.push({name, query, params});
    },
    /**
     * 返回上一页
     * */
    goBack(){
      this.$router.back();
    },
    /**
     * 统一处理报错返回
     * @param res
     */
    handleError(res) {
      if (res.error_code == -206) {
        this.$message.error('登录超时，请重新登录');
        // 超时登录，跳转登录页
        this.$router.push({name: 'login'});
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        });
      }
    },
  }
}
