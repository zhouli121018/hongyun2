<template>
    <div>
        <title-bar title_name="用户中心" />
        <div class="my_title" v-if="info != null">
            <img class="my_title_photo" :src="$https_img+info.img" alt="">
            <div class="my_title_center">
                <div>
                    <span style="font-weight:bold;font-size:0.45rem;color:#232323;">{{info.uname}}</span>
                    <img v-if="info.isvip == 1" class="my_title_center_img" src="../../assets/vip.png" alt="">
                    <img v-if="info.isexp == 1" class="my_title_center_img" src="../../assets/zhuan.png" alt="">
                    <span v-if="info.isvip == 1" class="red">(剩余{{info.vipdate}}天)</span>
                    <span v-else class="red">(非会员)</span>
                </div>
                <div class="goldcoins_fans">
                    <p><span style="font-size:13px">粉丝: </span><span style="font-size:13px">{{info.fans}}</span></p> 
                     <!-- $isvip='1';//是否VIP 1是vip，0不是vip -->
                    <!-- <img v-if="info.isvip == 1" class="my_title_center_img" src="~@/assets/vip.png" alt="">
                    <img v-else class="my_title_center_img" src="~@/assets/vip-gary.png" alt="">
                    <span v-if="info.isvip == 1" class="red">(剩余{{info.vipdate}}天)</span>
                    <span v-else class="red">(非会员)</span> -->
                </div>
            </div>
            <van-button v-if="info.isvip == 0" class="orange_btn" round @click="jumpTo('/home/openingMember')" style="white-space:nowrap;">开通会员</van-button>
            <van-button v-else class="orange_btn" round @click="jumpTo('/home/openingMember')" style="white-space:nowrap;">会员续费</van-button>
        </div>
        <div class="my_title_box">
            <div class="my_title" style="border:none;width:47.5%" v-if="info">
                <img class="my_title_photo title_photo" src="~@/assets/icon.png" alt="">
                <div class="my_title_center my_centers">
                    <p>
                        <b style="font-size:0.5rem;font-weight:bold;">{{info.jindou}}</b>
                    </p>
                    <p class="goldcoins_fans">
                        金豆
                    </p>
                </div>
                <van-button style="background:#87AC55;color:#fff;border-radius:.1rem;padding:0 .3rem" size="small" >购买</van-button>
            </div>
            <div class="my_title" style="border:none;width:51%" v-if="info">
                <img class="my_title_photo title_photo" src="~@/assets/icon.png" alt="">
                <div class="my_title_center my_centers">
                    <p>
                        <b style="font-size:0.5rem;font-weight:bold;">{{info.income_cur}}</b>
                    </p>
                    <p class="goldcoins_fans">
                        余额
                    </p>
                </div>
                <van-button style="background:#87AC55;color:#fff;border-radius:.1rem;padding:0 .3rem" size="small" @click="jumpTo('/personal/inviteDetail')" >提款</van-button>
            </div>
        </div>
        <div v-if="info != null">
            <van-cell title="修改资料" is-link icon="tj" @click="jumpTo(`/personal/modifydata?uname=${info.uname}&icon=${info.img}`)"/>
            <van-cell title="提交预测" is-link icon="dlzq"  @click="jumpTo('/personal/submitPredict')"/>
            <van-cell title="我查看的预测" is-link icon="kjtx"  @click="jumpTo('personal/myview')"/>
            <van-cell title="分享赚钱和金币(0元)" is-link icon="free"  @click="jumpTo('/personal/freeUse')"/>
            <van-cell title="我的关注" is-link icon="mylook"  @click="jumpTo('/personal/myfocus')"/>
            <van-cell title="卖会员码（专家权限）" is-link icon="membercode"  v-if="info.isexp == 1" @click="jumpTo('/personal/sell')"/>
            <van-cell title="专家推广页" is-link icon="promote"  @click="jumpTo('/personal/freeUse')"/>
            <van-cell title="关于" is-link icon="about"  @click="jumpTo('/personal/about')"/>
        </div>

        <div class="xian"></div>

        <!-- <div class="text_center">
            <van-button @click="logout" type="danger" size="small" style="width:30%">退出账号</van-button>
        </div> -->
    </div>
</template>

<script>
import { getaccount } from '@/api'
import { Dialog } from 'vant'
export default {
    data() {
        return {
            info: null,
            isFirstEnter:false,
            ticketnum: '',
        }
    },
    methods:{
        logout(){
            Dialog.confirm({
                className:'small_padding',
                message: '退出当前帐号？'
            }).then(() => {
                // on confirm
                localStorage.clear();
                this.$router.push('/home/index')
            }).catch(() => {
                // on cancel
            });
            
        },
        jumpTo(path){
            this.$router.push(path);
        },
        async getaccount() {
            const { data } = await getaccount({
                sid: localStorage.getItem('hsid'),
                uid: localStorage.getItem('huid')
            })
            this.info = data
        },
        goAbout(){
            this.$router.push('/personal/about');
        },
    },
    created() {
        this.isFirstEnter=true;
    },
    activated(){
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        this.getaccount();
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
}
</script>

<style scoped lang="stylus">
.red
    font-size 12px
.text_center
    padding .2rem
    text-align center
.container
    background #F5F5F5
.my_centers
    width 60%!important
    p 
        line-height .6rem
        &:last-child
            color #666
            font-size .35rem
/deep/ .van-cell
    line-height .88rem
/deep/ .van-icon-tj::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/modify.png') no-repeat
    background-size contain
/deep/ .van-icon-dlzq::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/submit.png') no-repeat
    background-size contain
/deep/ .van-icon-kjtx::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/look_predict.png') no-repeat
    background-size contain
/deep/ .van-icon-free::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/share.png') no-repeat
    background-size contain
/deep/ .van-icon-mylook::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/my_look.png') no-repeat
    background-size contain
/deep/ .van-icon-membercode::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/membercode.png') no-repeat
    background-size contain    
/deep/ .van-icon-promote::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/promote.png') no-repeat
    background-size contain   
/deep/ .van-icon-about::before 
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/about_zzh.png') no-repeat
    background-size contain
.my_title
    width: 100%
    padding .2rem 
    box-sizing border-box 
    display flex
    align-items center
    border-bottom 1px solid #f0f0f0
    background #fff
    margin-top:-.1rem
    .my_title_center
        width 60%
        span 
            line-height .5rem
            padding-right .1rem
    .my_title_photo
        width 1.5rem
        height 1.5rem
        border-radius 50%
        margin-right .1rem
    .goldcoins_fans
        display flex
        padding-top .1rem
        align-items center
        span 
            font-size .26rem
        p
            padding-right .3rem
    .my_title_center_img
        width .65rem
        height .65rem
        margin 0 .2rem 0 0
        vertical-align middle
.orange_btn
    border-radius .6rem
    background #FFC131
    color #FF3858
    height 1rem
    line-height 1rem
    padding 0 .3rem
    font-size 0.36rem
.title_photo
    width .77rem!important
    height .77rem!important
.my_title_box
    width 100%
    background #eee
    padding .4rem 0
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    .my_title
        width 49%
        padding .3rem .1rem
        .my_centers
            width 45%!important
    /deep/ .van-button--small {
        padding: 0 6px;
        height: 25px;
        min-width: 45px;
        font-size: 13px;
        line-height: 20px;
    }
</style>
