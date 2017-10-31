<template>
  <!--<keep-alive>-->
  <router-view></router-view>
  <!--</keep-alive>-->
</template>

<script>
  export default {
    data () {
      return {
        transitionName : '',
      }
    },
    mounted() {
      this.appShow();
      /**
       * body绑定touchstart 事件，让IOS 有active效果
       * */
      document.addEventListener('touchstart',function(){}, false);
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
          document.querySelector('.app-loading').className += ' app-loading-hide'
        }, diffTime > 1000 ? 0 : 1000 - diffTime)
      }
    }
  }
</script>
