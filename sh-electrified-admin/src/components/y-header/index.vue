<template>
    <x-layout class="layout-header">
        <header class="header-bar clearfix">
            <img class="logo-icon float-left margin-top-20 margin-left-40"
                 :src="img" />
         <!--   <img :src=userInfo.preview alt="">
            <img src="./../../assets/images/icon/logo_icon.png" alt="">
            <img src="./../../../static/bigImg/login/close-uploading.png" alt="">-->
            <span class="header-slogan float-left">生活缴费</span>
            <div class="float-right margin-top-30 margin-right-20">
                <!--<router-link to="/portDispose" class="port-dispose">接口配置</router-link>-->

                <span class="login-info">

                  用户名:{{registerInfo.username}}
                  <!--<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
                </span>
                <!--<el-dropdown>-->
                    <!---->
                    <!--&lt;!&ndash;<el-dropdown-menu class="login-dropdown" slot="dropdown">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-dropdown-item><router-link to="/accountInfo">账号信息</router-link></el-dropdown-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-dropdown-item><router-link to="/passwordEdit">修改密码</router-link></el-dropdown-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-dropdown-menu>&ndash;&gt;-->
                <!--</el-dropdown>-->
                <span class="made-link" @click="logout">退出</span>
            </div>
        </header>
    </x-layout>
</template>

<script>
    import ajaxMixin from '../../mixins/ajaxMixin'
    import { mapGetters, mapActions } from 'vuex'
    import xLayout from './../../../src/components/y-layout'
    export default {
      components:{
        xLayout,
      },
        mixins: [ajaxMixin],
        data(){
            return {
                img: require('./../../../src/assets/images/icon/logo_icon.png')
            }
        },
        computed : {
            ...mapGetters([
                'registerInfo'
            ])
        },
        methods: {
            ...mapActions([
                'loginoutServer'
            ]),
            /**
             * 退出登录
             */
            logout() {
                this.loginoutServer({}).then((res)=>{
                    if(res.success) {
                        this.$router.push({ name: 'login'})
                    } else {
                        this.handleError(res);
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "index.less";
    .port-dispose{
        margin-right: 10px;
        color:#fff;
        cursor: pointer;
    }
</style>
