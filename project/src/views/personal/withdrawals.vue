<template>
    <div>
        <title-bar title_name="提款" right_text="收入明细" right-url="/personal/incomeDetails"/>
        <div class="money_box">
            <p>余额(元)</p>
            <div>
                <span>235.99</span>
                <div>
                    <van-button style="background-color: transparent;color:#fff;border: 1px solid #D9E3CD;" size="small">提款</van-button>
                    <van-button style="background-color: transparent;color:#fff;border: 1px solid #D9E3CD;" size="small">分享赚钱</van-button>
                </div>
            </div>    
            <p>满50元可提款</p>
        </div> 
        <div class="xian"></div>
        <div class="member_box">
            <div>
                <span>日期</span>
                <span>金额</span>
                <span>状态</span>
            </div>
            <div>
                <span>2019/02/10 09:01</span>
                <span>0.001</span>
                <span>审核中</span>
            </div>
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
        
    }
}
</script>

<style scoped lang="stylus">
.money_box
    width 94%
    margin .3rem auto 
    background #87AC55
    border-radius .15rem
    padding .4rem .3rem
    box-sizing border-box
    height 4.5rem
    color #fff
    div
        display flex
        justify-content space-between
        align-items center
        padding .25rem 0
        button:first-child 
            margin-right .3rem
        >span
            font-size 26px
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
            text-align center
            &:first-child
                width 40%
            &:nth-child(2)
                width 30%  
            &:last-child
                width 20%  
        &:first-child
            background #f5f5f5
            span 
                font-size 14px
                
</style>
