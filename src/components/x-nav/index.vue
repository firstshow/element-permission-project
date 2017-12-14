<template>
  <div class="x-nav">
    <div>
      <button @click="isCollapse = true">开</button>
      <button @click="isCollapse = false">关</button>
    </div>
    <el-menu
      :default-active="nowRouter"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      unique-opened
      :collapse="isCollapse"
      router
      @close="handleClose">
      <div v-for="nodes in userInfo.routesList" :key="nodes.title">
        <el-submenu :index="nodes.children[0].path" v-if="nodes.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span v-if="!isCollapse">{{nodes.title}}</span>
          </template>
          <el-menu-item-group v-if="nodes.children">
            <el-menu-item v-for="node in nodes.children" :index="node.path" :key="node.path">{{node.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="nodes.path" v-else>
          <i class="el-icon-setting"></i>
          <span slot="title">{{nodes.title}}</span>
        </el-menu-item>
      </div>
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
        nowRouter: '/account/user-list',
        isCollapse: true
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

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
