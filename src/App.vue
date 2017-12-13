<template>
  <div class="x-main-section">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'app',
    mounted() {
      this.appShow();
    },
    created(){
      this.initRoutes();
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },
    methods: {
      /**
       * 初始加载时候的loading动画
       * */
      appShow() {
        const END_TIME = new Date().getTime() //结束时间
        const diffTime = END_TIME - PAGE_START_TIME
        const timer = setTimeout(() => {
          clearTimeout(timer)
          document.querySelector('#loading').className += ' app-loading-hide'
        }, diffTime > 1000 ? 0 : 1000 - diffTime)
      },
      initRoutes(){
        console.log(this.userInfo.permissionList);
        if(this.userInfo.permissionList.length > 0){
          console.log("aaa");
          this.$router.addRoutes(this.userInfo.permissionList);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "styles/reset";
  @import "styles/theme";
  @import "styles/public";
</style>
