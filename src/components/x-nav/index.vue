<template>
  <div class="x-nav">
    <el-menu
      :default-active="nowRouter"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      unique-opened
      router
      @close="handleClose">
      <el-submenu v-for="nodes in userInfo.routesList" :index="nodes.children ? nodes.children[0].path : nodes.path" :key="nodes.title">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{nodes.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="node in nodes.children" :index="node.path" :key="node.path">{{node.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        logining: 'aaaaa',
        nowRouter: '/account/user-list'
      };
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },
    created() {
      this.nowRouter = this.$router.history.current.fullPath;
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
