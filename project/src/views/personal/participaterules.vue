<template>
    <div>
        <div class="recommend_title">
            <van-nav-bar
                left-arrow
                @click-left="goBack"
            />
        </div>
        <div class="recommend_content">
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
}
</script>

<style scoped lang="stylus">
.container
    padding-top 0!important
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
    height 4.95rem
    background url('../../assets/recommend_img.png') no-repeat
    background-size cover
.recommend_content
    width 90%
    margin -1.8rem auto 0 auto 
    padding .4rem .2rem 1rem
    box-sizing border-box
    background #ffffff
    box-shadow 0 0 0.2rem #ddd
    border-radius .25rem
    min-height 5rem
    text-align center
</style>
