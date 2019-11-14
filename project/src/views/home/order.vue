<template>
    <div>
        <title-bar title_name="订单"/>
        <div style="padding: .1rem .2rem">
            <van-field
                v-model="revname"
                label="收货人 : "
                placeholder="请输入姓名"
            />
            <van-field
                v-model="revphone"
                label="手机号 : "
                placeholder="请输入手机号"
            />
            <van-field
                v-model="revaddress"
                label="收货地址 : "
                placeholder="请输入收货地址"
            />
        </div>
        <div class="xian"></div>
        <div class="order_product">
            <img :src="$https+pic" alt="">
            <div>
                <p>{{name}}</p>
                <div>
                    <span class="pink">¥{{price}}</span>
                    <div class="num_btn">
                        数量 
                        <span @click="reduction">-</span>
                        <input type="number" disabled v-model="num">
                        <span @click="add">+</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="xian"></div>
        <van-cell title="运费" :value="'¥'+carriage" />
        <div class="xian"></div>
        <van-cell title="支付方式" />
        <div class="pay_choose" @click="choosePay(1)">
            <img src="~@/assets/ali_img.png" alt="">
            <div>
                <p>支付宝支付</p>
            </div>
            <img :src="payType == 1?chooseImg:normalImg" alt="">
        </div>
        <div class="pay_choose" @click="choosePay(0)">
            <img src="~@/assets/wechat@2x.png" alt="">
            <div>
                <p>微信扫码支付</p>
            </div>
            <img :src="payType == 0?chooseImg:normalImg" alt="">
        </div>
        <div style="width:100%;height:3rem"></div>
        <div class="order_pay">
            <span>应付:  ¥{{Number(sumfee)+Number(carriage)}}</span>
            <van-button @click="buyproduct">购买</van-button>
        </div>
    </div>
</template>

<script>
import { buyproduct, getalipayorderinfor } from '@/api'
export default {
    data() {
        return {
            username: '',
            num: 1,
            payType: 1,//0为微信，1为支付宝
            chooseImg: require('../../assets/choose_checked.png'),
            normalImg: require('../../assets/choose_normal.png'),
            revname: '',
            revphone: '',
            revaddress: '',
            num: 1,
            pid: '',
            price: 0,
            carriage: 0,
            info: null
        }
    },
    methods: {
        choosePay(e) {
            this.payType = e
        },
        // 数量减
        reduction() {
            if(this.num > 1) {
                this.num --
            }
        },
        add() {
            this.num ++
        },
        // 点击购买
        async buyproduct() {
            if(!this.revname || !this.revphone || !this.revaddress) {
                this.$toast('请填写收货信息!')
                return
            }
            const { data } = await buyproduct({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                revname: this.revname,
                revphone: this.revphone,
                revaddress: this.revaddress,
                num: this.num,
                pid: this.pid,
                price: this.price,
                carriage: this.carriage,
                sumfee: parseFloat(Number(this.sumfee)+Number(this.carriage)).toFixed(2),
                paytype: this.payType,//0为微信，1为支付宝
            })
            if(data.errorcode == 0) {
                if(this.payType == 1) {
                    this.getalipayorderinfor()
                }else {
                    let money = parseFloat(Number(this.sumfee)+Number(this.carriage)).toFixed(2)
                    this.$router.replace(`/personal/pay?money=${money}`)
                }
            }
        },
        //支付宝支付
        async getalipayorderinfor() {
            const { data } = await getalipayorderinfor({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                money: parseFloat(Number(this.sumfee)+Number(this.carriage)).toFixed(2)
            })
            const div = document.createElement('div');
            div.innerHTML = data.content
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit(); 
        }
    },
    computed: {
        sumfee() {
            return parseFloat(this.price*this.num).toFixed(2)
        }
    },
    created() {
        this.name = this.$route.query.name
        this.price = this.$route.query.price
        this.carriage = this.$route.query.carriage
        this.pid = this.$route.query.pid
        this.pic = this.$route.query.pic
        console.log(this.pic)
    },
    mounted() {
        
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
    >div
        width 100%
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
