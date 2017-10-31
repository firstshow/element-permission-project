<template>
    <div class="aaa">
        我是登录页面{{username}}

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
                logining:'aaaaa',
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
