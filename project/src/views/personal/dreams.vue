<template>
    <div>
        <title-bar title_name="梦兆"/>
        <div class="search_box">
            <input v-model="keyword" placeholder="请输入号码或梦境关键词" />
            <img src="../../assets/sreach_img.png" alt="">
        </div>
        <div class="dreams_list">
            <img src="" alt="">
            <div>
                <p>七星彩实战宝典</p>
                <p>
                    <span>3089</span>
                    <span>8790</span>
                </p>
            </div>
        </div>
        <div class="dreams_list">
            <img src="" alt="">
            <div>
                <p>七星彩实战宝典</p>
                <p>
                    <span>3089</span>
                    <span>8790</span>
                </p>
            </div>
        </div>
        <div class="dreams_list">
            <img src="" alt="">
            <div>
                <p>七星彩实战宝典</p>
                <p>
                    <span>3089</span>
                    <span>8790</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        onSearch() {

        }
    }
}
</script>

<style scoped lang="stylus">
.dreams_list
    width 94%
    padding .2rem 
    box-sizing border-box 
    display flex
    align-items center
    margin-top .6rem
    img 
        width 2.56rem
        height 3.5rem
        margin-right .4rem
        background #333
    p 
        height 1.8rem
        line-height 1.8rem
        &:first-child
            font-size 18px
        span 
            padding-right .6rem
.search_box
    width 90%
    height 1.2rem
    margin .2rem auto
    background #EDEDED
    border-radius .5rem
    display flex
    justify-content space-between
    align-items center
    padding 0 .4rem
    box-sizing border-box
    input 
        width 90%
    img 
        width .52rem
        height .52rem
    
</style>
