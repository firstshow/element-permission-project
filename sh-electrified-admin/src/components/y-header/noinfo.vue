<template>
    <x-layout class="layout-header">
        <header class="header-bar clearfix">
            <i class="logo-icon float-left margin-top-20 margin-left-40"></i>
            <div class="float-right margin-top-30 margin-right-20">
                <span style="cursor: pointer;" @click="toLogin">登录</span>
            </div>
        </header>
    </x-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        computed : {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            toLogin() {
                this.$router.push({ path: '/login' })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>
