<template>
    <div class="container">
        <title-bar title_name="会员码明细"/>
        <div class="member_box">
            <div>
                <span>会员码</span>
                <span>使用时间</span>
                <span>使用人</span>
            </div>
            <div>
                <span>000008088</span>
                <span>2019/02/10 09:01</span>
                <span>某某某</span>
            </div>
            <div>
                <span>000008088</span>
                <span>2019/02/10 09:01</span>
                <span>某某某</span>
            </div>
            <div>
                <span>000008088</span>
                <span>2019/02/10 09:01</span>
                <span>某某某</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus">
.member_box
    div
        display flex
        justify-content space-around
        align-items center
        width 100%
        height 1.2rem
        border-bottom 1px solid #eee
        span    
            font-size 13px
        &:first-child
            background #f5f5f5
            span 
                font-size 14px
</style>
