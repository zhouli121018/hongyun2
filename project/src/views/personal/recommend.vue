<template>
    <div class="container" v-if="info">
        <div class="recommend_title">
            <div class="title_top">
                <div @click="goBack" style="width:1rem;height:1rem;line-height:1rem">
                    <img src="~@/assets/returnpre.png" alt="">
                </div>
                <p>我的推荐页</p>
                <span></span>
            </div>
            <div class="title_center">
                <div style="padding-left:.2rem;">
                    <img src="~@/assets/logo_hysm.png" alt="">
                    <div style="font-size: .44rem;padding: .3rem .2rem;">四字定位助手</div>
                </div>
                
                <div class="flex_grow_1" style="text-align:center;">
                    <img class="right_img" src="~@/assets/right_img.png" alt="">
                </div>
            </div>
        </div>
        <div class="recommend_content">
            <p class="content_weight">邀请码: {{info.invitecode}}</p>
            <div style="width:5rem;height:5rem;margin:0 auto;"><img :src="info.barcode" alt=""></div>
            <div class="content_font fonts">
                {{info.invitedesc}}
            </div>
        </div>
    </div>
</template>

<script>
import { gettuijiancode } from '@/api/home'
export default {
    data() {
        return {
            info: null
        }
    },
    methods: {
        // 返回
        goBack(){
            this.$store.dispatch('set_isback',true)
            setTimeout(() => {
                this.$store.dispatch('set_isback',false)
            }, 500);
            this.$router.go(-1)
        },
        async gettuijiancode() {
            const { data } = await gettuijiancode({
                
            })
            if(data.errorcode == 0) {
                this.info = data
            }
        }
    },
    created() {
        this.gettuijiancode()
    }
}
</script>

<style lang="stylus" scoped>
.content_font
    color #7D7D7D
    padding 0 .1rem
    padding-top .3rem
    text-align left 
    line-height .6rem
    text-align justify
.fonts
    margin-top 1rem
    font-size 0.5rem
.recommend_content
    width 90%
    margin -.6rem auto 0 auto 
    padding .4rem .2rem 1rem
    box-sizing border-box
    background #ffffff
    box-shadow 0 0 0.2rem #ddd
    border-radius .25rem
    min-height 5rem
    text-align center
    .content_weight
        font-size .55rem
        padding .4rem 0
        color #232323
    img 
        width 5rem
        height 5rem
.title_center
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding .2rem .3rem
    box-sizing border-box
    >div
        font-size 0.6rem
        color #ffffff
    >div>p 
        font-size 0.52rem
        color #ffffff
    p:last-child
        padding-top .2rem
    img 
        width 2.6rem
        // height 1.2rem
    img.right_img
        width 4.5rem
.recommend_title
    width 100%
    height 4.92rem
    background url('../../assets/recommend_page.png') no-repeat
    background-size cover
.title_top
    width 100%
    display flex
    align-items center
    color #fff
    height 1.2rem
    line-height 1.2rem
    padding 0 .3rem
    box-sizing border-box
    p
        width 82%
        text-align center
        font-size 16px
    img 
        width .25rem
        height .37rem
        z-index 99999
.container
    padding-top 0!important
</style>

