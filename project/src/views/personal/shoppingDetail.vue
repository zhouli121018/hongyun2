<template>
    <div v-if="info != null">
        <title-bar title_name="商品详情"/>
        <div style="padding:.2rem .35rem;box-sizing:border-box">
            <!-- <van-swipe indicator-color="#007BC2">
            <van-swipe-item  v-for="(image, index) in info.imgs" :key="index"> -->
                <div class="swipe_img_box">
                <img :src="$https+info.pic" />
                </div>
            <!-- </van-swipe-item>
            </van-swipe> -->
            <div style="font-size:15px">{{info.name}}</div>
            <div style="color:#999;font-size:13px">{{info.pdesc}}</div>
            <p class="pink">¥{{info.price}}</p>
            <div class="money_sales">
                <span>运费: {{info.carriage}}</span>
                <span>销量: {{info.buynum}}</span>
            </div>
        </div>
        <div class="xian"></div>
        <!-- 详情页 -->
        <div v-for="(image, index) in info.imgs" :key="index">
            <img style="width:100%;height:4rem" :src="$https+image" alt="">
        </div>
        <div class="shopping_bottom">
            <van-button @click="toOrder" size="large" style="background:#87AC55;color:#fff">前往购买</van-button>
        </div>
    </div>
</template>

<script>
import  { getproduct } from '@/api'
export default {
    data() {
        return {
            info: null
        }
    },
    methods: {
        toOrder() {
            this.$router.push(`/home/order?pid=${this.info.pid}&carriage=${this.info.carriage}&pic=${this.info.pic}&price=${this.info.price}&name=${this.info.name}`)
        },
        async getproduct() {
            const { data } = await getproduct({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                pid: this.$route.query.pid
            })
            this.info = data
            console.log(this.info.pic)
            
        }
    },
    mounted() {
        this.getproduct()
    }

}
</script>

<style lang="stylus" scoped>
    .swipe_img_box
        width 100%
        height 6rem
        margin-bottom .2rem
        img 
            height 6rem
            width 100%
    .van-button
        border-radius 0
    .shopping_bottom
        width 100%
        position fixed 
        justify-content center
        align-items center
        bottom 0
    .pink
        font-size 18px
    div,p
        line-height .6rem
    .money_sales
        display flex
        align-items center
        justify-content space-between
        padding-top .3rem
        span 
            font-size 12px
            color #999
</style>

