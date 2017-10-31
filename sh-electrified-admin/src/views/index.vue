<template>
    <div id="app">
        <x-header></x-header>
        <x-content>
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </x-content>
        <x-footer></x-footer>
    </div>
</template>

<script>
  import xLayout from './../../src/components/y-layout'
  import xHeader from './../../src/components/y-header'
  import xContent from './../../src/components/y-content'
  import xFooter from './../../src/components/y-footer'
    export default {
      components:{
        xLayout,
        xFooter,
        xHeader,
        xContent,
      },
        data () {
            return {

            }
        },
        // 接着在父组件内
        // watch $route 决定使用哪种过渡
        watch: {
            '$route' (to, from) {
                console.log()
            }
        }
    }
</script>
