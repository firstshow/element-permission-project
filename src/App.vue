<template>
  <div class="x-main-content">
    <!--<x-header></x-header>-->
    <!--<x-menu></x-menu>-->
    <router-view/>
  </div>
</template>

<script>

export default {
    name: 'app',
    mounted() {
        this.appShow();
    },
    methods:{
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
        }
    }
}
</script>

<style lang="scss">
  @import "styles/reset";
  @import "styles/theme";
  @import "styles/public";
</style>
