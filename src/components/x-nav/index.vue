<template>
  <el-menu
    default-active="account"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    unique-opened
    router
    @close="handleClose">
    <el-submenu index="/account">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>账号管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/account/user-manager">用户管理</el-menu-item>
        <el-menu-item index="/account/controller-manager">管理员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
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
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }

    }
</script>

<style lang="scss" scoped>
    @import "index.scss";
</style>
