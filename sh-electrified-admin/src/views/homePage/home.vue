<template>
    <div class="home-page-img">
      <img :src="homePageImg" alt="">
    </div>
</template>

<script>

  export default {
    data(){
      return {
        homePageImg:require('./../../assets/images/home_pagge_img.png')
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
