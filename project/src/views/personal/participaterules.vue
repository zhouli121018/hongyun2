<template>
    <div class="wrap_box">
        <div class="recommend_title">
            <van-nav-bar
                left-arrow
                @click-left="goBack"
            />
        </div>
        <div class="recommend_content">
            <div class="rules_img">奖励红包</div>
            <p>每期都奖励一名专家，奖励红包40元</p>
            <div class="rules_img rules_imgs">参与条件</div>
            <p>每期都奖励一名专家，奖励红包40元</p>
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

<style scoped lang="stylus">
.rules_img
    width 3.1rem
    height 1.2rem
    background url('~@/assets/rules_img.png') no-repeat
    background-size contain
    line-height 1rem
    text-align center
    color #FF2B60
    margin-left -8%
    margin-bottom .4rem
    margin-top .4rem
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
    height 5.95rem
    background url('../../assets/recommend_img.png') no-repeat
    background-size cover
.recommend_content
    width 85%
    margin -1.8rem auto 0 auto 
    padding .4rem .2rem 1rem
    box-sizing border-box
    background #ffffff
    box-shadow 0 0 0.2rem #ddd
    border-radius .25rem
    min-height 10rem
    text-align center
    position relative
</style>
