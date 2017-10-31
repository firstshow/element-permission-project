<template>
  <div class="x-main-section">
    <x-header></x-header>
    <div class="x-main-content">
      <el-row>
        <el-col :span="4">
          <x-nav></x-nav>
        </el-col>
        <el-col :span="20">
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import XHeader from 'src/components/x-header/index.vue'
  import XNav from 'src/components/x-nav/index.vue'

  export default {
    name: 'app',
    components: {
      XHeader, XNav
    },
    mounted() {
      this.appShow();
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
      }
    }
  }
</script>

<style lang="scss">
</style>
