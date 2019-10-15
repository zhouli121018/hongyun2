<template>
    <div>
        <title-bar title_name="订单"/>
        <div style="padding: .1rem .2rem">
            <van-field
                v-model="username"
                label="收货人 : "
                disabled
            />
            <van-field
                v-model="username"
                label="手机号 : "
                disabled
            />
            <van-field
                v-model="username"
                label="收货地址 : "
                disabled
            />
        </div>
        <div class="xian"></div>
        <div class="order_product">
            <img src="../../assets/chart.png" alt="">
            <div>
                <p>七星实战宝典七星实战宝典七星实战宝典七星实战宝典七星实战宝典</p>
                <div>
                    <span class="pink">¥99.99</span>
                    <div class="num_btn">
                        数量 
                        <span>-</span>
                        <input type="number" disabled v-model="num">
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="xian"></div>
        <van-cell title="运费" value="¥9" />
        <div class="xian"></div>
        <van-cell title="支付方式" />
        <div class="pay_choose" @click="choosePay(1)">
            <img src="~@/assets/ali_img.png" alt="">
            <div>
                <p>支付宝支付</p>
            </div>
            <img :src="payType == 1?chooseImg:normalImg" alt="">
        </div>
        <div class="pay_choose" @click="choosePay(2)">
            <img src="~@/assets/wechat@2x.png" alt="">
            <div>
                <p>微信扫码支付</p>
            </div>
            <img :src="payType == 2?chooseImg:normalImg" alt="">
        </div>
        <div style="width:100%;height:3rem"></div>
        <div class="order_pay">
            <span>应付:  ¥998</span>
            <van-button>购买</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            num: 1,
            payType: 1,
            chooseImg: require('../../assets/choose_checked.png'),
            normalImg: require('../../assets/choose_normal.png'),
          
        }
    },
    methods: {
        choosePay(e) {
            this.payType = e
        },
    }
}
</script>

<style lang="stylus" scoped>
.order_pay
    width 100%
    position fixed
    bottom 0
    display flex
    justify-content space-between
    align-items center
    padding .1rem .3rem
    box-sizing border-box
    z-z-index 999
    .van-button
        background #87AC55
        width 3rem
        color #fff
.pay_choose
    width 100%
    padding .4rem .2rem
    box-sizing border-box
    display flex
    align-items center
    border-top 1px solid #E8E8E8
    >div
        width 80%
        padding-left .2rem
        >p 
            line-height .5rem
            &:last-child
                font-size 14px
                color #666
    img
        &:first-child
            width .88rem
            height .88rem
        &:last-child
            width .54rem
            height .54rem
.order_product
    width 94%
    margin .1rem auto
    padding .3rem .1rem
    display flex
    align-items center
    img 
        width 2.2rem
        height 2.2rem
        margin-right .2rem
    p 
        line-height .6rem
    >div>div
        display flex
        justify-content space-between
        padding-top .4rem
        align-items center
    .num_btn
        display flex
        justify-content space-between
        align-items center
        span 
            border 1px solid #8A8A8A
            padding .1rem .2rem
            &:first-child 
                margin-left .3rem
        input 
            width .8rem
            text-align center
            padding .02rem 0
            border-top 1px solid #8a8a8a
            border-bottom 1px solid #8a8a8a

.van-cell
    border-bottom 1px solid #e3e3e3
    &:last-child
        border-bottom none
</style>
