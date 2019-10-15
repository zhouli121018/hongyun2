<template>
    <div>
        <title-bar title_name="订单列表"/>
        <div class="order_box">
            <van-cell value="2019/12/12 01:01:01" />
            <div class="list_div">
                <img src="" alt="">
                <span>七星彩实战宝典</span>
            </div>
            <div class="list_div">
                <span>数量: 1</span>
                <span>金额: ¥98</span>
                <span>状态: <span class="pink">已收货</span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus">
.order_box
    width 100%
    border-bottom 10px solid #f5f5f5
    padding .2rem .25rem
    box-sizing border-box
    .list_div 
        display flex
        padding .34rem 0
        img 
            width 1.8rem
            height 1.8rem
            margin-right .3rem
        &:last-child
            justify-content space-between
            span 
                line-height .6rem
.van-cell
    border-bottom 1px solid #e3e3e3
</style>
