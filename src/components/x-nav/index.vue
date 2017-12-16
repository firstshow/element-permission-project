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
      <template v-for="nodes in userInfo.routesList">
        <template v-if="nodes.children">
          <el-submenu :index="nodes.children[0].path" :key="nodes.title">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{nodes.title}}</span>
            </template>
            <el-menu-item-group v-if="nodes.children">
              <el-menu-item v-for="node in nodes.children" :index="node.path" :key="node.path">{{node.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="nodes.path">
            <i class="el-icon-setting"></i>
            <span slot="title">{{nodes.title}}</span>
          </el-menu-item>
        </template>
      </template>
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
