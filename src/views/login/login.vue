<template>
    <div class="aaa">
        我是登录页面{{userInfo.username}}
        <el-button type="primary">主要按钮</el-button>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'login',
        data() {
            return {
                logining:'aaaaa',
            };
        },
        computed: {
          ...mapGetters([
            'userInfo'
          ]),
       },
        methods: {
            ...mapActions([
                'uploadUserInfoServer', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
            ]),
        }
    }
</script>

<style lang="scss" scoped>
    @import "login.scss";
</style>
