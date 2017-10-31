/**
 * 轮播组件的混合
 * */

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption: {
                // 所有配置均为可选（同Swiper配置）
                // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象（假如你需要使用获取swiper对象来做什么事，那么这个属性一定要是true）
                notNextTick: true,
                autoplay: 3000,
                speed :800,
                direction : 'horizontal',
                grabCursor : false,
                setWrapperSize :false,
                autoHeight: true,
                loop:true,
                pagination : '.swiper-pagination',
                paginationClickable :false,
                mousewheelControl : false,
                observeParents:false,
                // if you need use plugins in the swiper, you can config in here like this
                // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                debugger: false,
                // swiper callbacks
                // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                onTransitionStart(swiper){
                    console.log(swiper)
                },
                // more Swiper config ...
                // ...
            }
        }
    },
    computed : {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    // activated(){
    //     console.log('this is current swiper object', this.swiper);
    //     this.swiper.slideReset();
    // }
    // mounted() {
    //     // you can use current swiper object to do something(swiper methods)
    //     // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //     console.log('this is current swiper object', this.swiper);
    //     this.swiper.slideTo(3, 1000, false)
    // }
}
