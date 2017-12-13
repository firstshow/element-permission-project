<template>
    <div class="aaa">
      无法招到该页面
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import publicMixin from 'src/mixins/publicMixin'
    export default {
        name: 'home',
      mixins: [publicMixin],
        data() {
            return {
              homePageImg:require('./../../assets/login/home_pagge_img.png')

            };
        },
        computed: {
            username () {
                return this.$store.state.userInfo.username
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>
