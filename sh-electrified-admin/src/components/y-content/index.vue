<template>
    <x-layout class="bg-gray content-box clearfix content-port">
      <el-menu :default-active="'0'" :active-text-color="'#3b7ac8'" class="el-menu-demo" mode="horizontal">
        <el-menu-item @click="chooseMainMenu(item,index)" :index="''+index" v-for="(item,index) in registerInfo.top_menu" :key = "item.id">
          {{item.title}}
        </el-menu-item>
      </el-menu>

      <div class="menu-port">
        <!--左侧菜单栏 start-->
        <el-col :span="4">
          <div class="left-menu-topTitle">{{topMenuIndex==''?registerInfo.top_menu[0].title:registerInfo.top_menu[topMenuIndex].title}}</div>
          <el-menu :default-active="'0'" :active-background-color="'#3b7ac8'" class="el-menu-vertical-demo">

            <el-menu-item @click="leftMenuLike(item.id,index)"  :index="''+index" v-for="(item,index) in registerInfo.left_menu" :key = "item.id">
              {{item.title}}
            </el-menu-item>
          </el-menu>
        </el-col>
        <!--左侧菜单栏 end-->

        <!--右侧菜单栏 start-->

        <el-col style="min-height: 600px" :span="20">
          <slot></slot>
        </el-col>

        <!--右侧菜单栏 end-->
      </div>



    </x-layout>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    import xLayout from './../../../src/components/y-layout'
    export default {
      components:{
        xLayout,
      },
        data() {
            return {
              activeIndex:'',
              topMenuIndex:'',//顶部导航 当前点击的索引
            }
        },
        computed: {
            ...mapGetters([
                'registerInfo',
            ]),
        },
        methods: {
            ...mapActions([
                'getMenuServer',//上部菜单栏控制左侧菜单栏
                'saveLeftMenuServer'
            ]),
//            handleSelect(key, keyPath) {
//            },
            // 保存auth_name信息
//            confirmAuthName(ele) {
//                console.log(ele);
//                this.saveAuthName({
//                    auth_name: ele
//                })
//            }

          /**
          *  点击 上方菜单
          * */
          chooseMainMenu(item,index){
            //获取 左侧菜单栏 数据
            this.topMenuIndex = index;
            this.getMenuServer({
              id:item.id
            }).then(res=>{
              this.saveLeftMenuServer({
                left_menu:res.left_menu
              })
            })
          },
          /**
          *  点击 左侧菜单
          * */
          leftMenuLike(id,index){
            console.log(id);
            console.log(index);
          }
        },
      watch: {
          '$route.path'(val) {
          }
      },
    }
</script>

<style lang="less" scoped>
    @import "index.less";
</style>
<style lang="less">
  .content-port{
    .el-menu-item:hover{
      outline: 0;
      color: #3b7ac8 !important;
    }
    .menu-port {
      .left-menu-topTitle{
        z-index: 11;
        width:60%;
        height:40px;
        margin: 0 auto;
        margin-top: -20px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        line-height: 40px;
        background-color: #3b7ac8;
        color: #fff;
        font-size: 14px;
      }
      .el-menu{
        padding-top: 10px;
        border-right:0;
        .el-menu-item{
          border: 1px solid #3b7ac8;
          /*border-right:0;*/
          color: #878d99;
        }
        .el-menu-item:nth-last-of-type(1){
          border-top: 0;
        }
        .el-menu-item:hover,.el-menu-item:focus{
          border-bottom: 1px solid #fff;
          background-color: #3b7ac8 !important;
          color: #fff !important;
        }
      }
    }
  }
</style>
