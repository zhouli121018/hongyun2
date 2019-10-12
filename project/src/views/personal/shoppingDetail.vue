<template>
    <div>
        <title-bar title_name="商品详情"/>
        <div style="padding:.2rem .35rem;box-sizing:border-box">
            <van-swipe indicator-color="#007BC2">
            <van-swipe-item  v-for="(image, index) in advs" :key="index">
                <div class="swipe_img_box" @click="jumpTo(image.url)">
                <img :src="$https+image.pic" />
                </div>
            </van-swipe-item>
            </van-swipe>
            <div style="font-size:15px">七星彩实战宝典七星彩实战宝典</div>
            <div style="color:#999;font-size:13px">简介少时诵诗书所所所所所哒哒哒哒哒哒多多哒哒哒哒哒哒多多多多多多多</div>
            <p class="pink">¥99.99</p>
            <div class="money_sales">
                <span>运费: 7.00</span>
                <span>销量: 87777</span>
            </div>
        </div>
        <div class="xian"></div>
        <!-- 详情页 -->
        <div></div>
        <div class="shopping_bottom">
            <van-button size="large" style="background:#87AC55;color:#fff">前往购买</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            advs:[],
        }
    }
}
</script>

<style lang="stylus" scoped>
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

