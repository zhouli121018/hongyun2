<template>
    <div>
        <title-bar title_name="商城"/>
        <div class="shopping_box">
            <router-link class="shopping_list" to="/personal/shoppingDetail">
                <img src="../../assets/recommend_page.png" alt="">
                <div>七星彩实战宝典</div>
                <div>
                    <span style="font-size:13px">1888人购买</span>
                    <span class="pink">¥99.99</span>
                </div>
            </router-link>
            <div class="shopping_list">
                <img src="../../assets/recommend_page.png" alt="">
                <div>七星彩实战宝典</div>
                <div>
                    <span style="font-size:13px">1888人购买</span>
                    <span class="pink">¥99.99</span>
                </div>
            </div>
                        <div class="shopping_list">
                <img src="../../assets/recommend_page.png" alt="">
                <div>七星彩实战宝典</div>
                <div>
                    <span style="font-size:13px">1888人购买</span>
                    <span class="pink">¥99.99</span>
                </div>
            </div>
            <div class="shopping_list">
                <img src="../../assets/recommend_page.png" alt="">
                <div>七星彩实战宝典</div>
                <div>
                    <span style="font-size:13px">1888人购买</span>
                    <span class="pink">¥99.99</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.shopping_box
    width 100%
    padding .2rem
    box-sizing border-box
    display flex
    flex-wrap wrap
    justify-content space-around
.shopping_list
    width 45%
    text-align center
    border-bottom 1px solid #eee
    padding-bottom .2rem
    margin-top .3rem
    div
        display flex
        align-items center
        justify-content space-between
        line-height .8rem
    img 
        width 100%
        height 5.03rem
.pink
    font-size 12px
</style>

