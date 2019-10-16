<template>
    <div class="wrap_box">
        <div class="recommend_title">
            <van-nav-bar
                title="***专家"
                left-arrow
                @click-left="goBack"
            />
            <div class="photo_name">
                <img src="../../assets/chart.png" alt="">
                <div>昵称 <img src="../../assets/zhuan.png" alt=""><img src="../../assets/vip.png" alt=""></div>
            </div>
            <div class="code">
                <img src="../../assets/submit.png" alt="">
                <p>扫码关注</p>
            </div>
            <div class="fans">
                <div>
                    <p>粉丝</p>
                    <p>2987294798</p>
                </div>
                <div>
                    <p>查看次数</p>
                    <p>2987294798</p>
                </div>
            </div>
        </div>
        <div class="promotion_list">
            <van-cell title="七星彩0912期" value="开奖: 122312" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
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
    }
}
</script>

<style lang="stylus" scoped>
.van-cell
    border-bottom 1px solid #e3e3e3
    .van-cell__value
        color #333
        font-size 13px
.fans
    display flex
    justify-content space-around
    align-items center
    margin-top .6rem
    p 
        line-height .6rem
        color #fff
        font-size 12px
        text-align center
.photo_name
    width 100%
    text-align center
    >img 
        width 2rem
        height 2rem
        border-radius 50%
    >div
        padding .2rem 0
        color #fff
        img 
            width .65rem
            height .65rem
            margin-left .15rem
.wrap_box
    position absolute 
    top 0
    bottom 0
    left 0 
    right 0
.van-nav-bar
    background transparent
    height 41px
    line-height 41px
.van-nav-bar__title
    color #ffffff
.van-hairline--bottom::after
    border-bottom-width: 0px;
.van-nav-bar .van-icon
    color #fff
.van-nav-bar__arrow
    font-size 20px
.recommend_title
    width 100%
    height 6.95rem
    background url('../../assets/promotionPage.png') no-repeat
    background-size cover
.code
    position absolute
    right .5rem
    top 1.2rem
    p
        color #ffffff
        font-size 12px
        padding-top .2rem
    img 
        width 1.6rem
        height 1.6rem
        
</style>
