<template>
    <div>
        <title-bar title_name="评论"/>
         <div class="content_item">
            <div class="flex line_1">
                <img src="http://sscby.cn/zzh/defaulticon.png" alt="">
                <div class="flex_grow_1">
                    <div>
                        <span class="uname">用户名</span>
                        <img class="zhuan_img" src="../../assets/zhuan.png" alt="">
                        <img src="../../assets/vip.png" alt="">
                    </div>
                    
                    <div class="time">昨天 23:08</div>
                </div>
            </div>
            <div class="line_2">文字阿斯顿文字阿斯顿文字阿斯顿文字字字，</div>
            <div class="flex line_3">
                <div class="flex_grow_1">1</div>
                <div class="flex_grow_1 center_box">2</div>
                <div class="flex_grow_1">3</div>
            </div>
            <div class="flex line_4">
                <div class="flex_grow_1"><img src="~@/assets/dingwei.png" alt="1" style="width:.26rem"> 海南天涯海角</div>
                <div class="flex_grow_1"><img src="~@/assets/pinglun.png" alt="1" style="width:.33rem"> 评论(121)</div>
                <div class="flex_grow_1"><img src="~@/assets/zhuanfa.png" alt="1" style="width:.36rem"> 转发(121)</div>
                <div class="flex_grow_1"><img src="~@/assets/dianzan.png" alt="1" style="width:.3rem"> 点赞(121)</div>
            </div>
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <div v-for="(item,index) in list" :key="index">
            <div class="list_item">
                <div class="flex line_1">
                    <div class="flex_grow_1">
                        <div>
                            <span class="uname">用户名</span>
                            <img class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img src="../../assets/vip.png" alt="">
                        </div>
                    </div>
                    <div class="time">11-12 01:02:03</div>
                </div>
                <div class="line_2">
                    <span class="text_s" v-if="index==0">文字阿斯顿文字阿斯顿文字阿斯顿文字字字，sdafdsafdsaf</span> 
                    <van-button v-if="index==1" style="background:#87AC55;color:#fff;width:2.76rem;font-size:.24rem;height:.73rem;line-height:.425rem;border-radius:.08rem;"><img src="~@/assets/yuyin.png" alt="1" style="width:.3rem;"> 点击听语音</van-button>
                    <img src="~@/assets/pinglun.png" alt="1" style="width:.33rem;float:right">
                </div>
                <div  v-if="index==0" style="background:#EDEDED;position:relative;padding:.35rem .36rem;color:#666666;border-radius:.08rem;">
                    <div>
                        <span style="color:#FF0B60;font-size:.4rem;">@梁小花</span>
                        <span style="font-size:.35rem">11-12 01:02:03</span>
                        <div style="padding:.36rem 0 .2rem;font-size:.35rem;">文字阿斯顿文字阿斯顿文字阿斯顿文字阿斯顿文字,</div>
                    </div>
                    <div style="width:0;height: 0;border-width: .3rem;border-style: solid;border-color: transparent transparent #EDEDED transparent;position:absolute;top:-.6rem;left:.3rem;"></div>
                </div>
                
            </div>
            <div style="background:#F5F5F5;height:0.2rem;"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
           list:[
               {},{}
           ]
        }
    },
    methods:{
       
    }
        
}
</script>

<style lang="stylus" scoped>
.content_item
    padding .4rem .6rem
    .line_1
        .flex_grow_1
            padding-left .23rem
            span.uname
                font-size:.42rem;
                color:#333;
                font-family:PingFang SC;
                margin-right: .11rem;
            img
                width .6rem
                height .6rem
                vertical-align middle
            .zhuan_img
                margin-right .19rem
        .time
            padding-top .35rem
            font-size .32rem
        img
            width 1.45rem
            height 1.45rem
    .line_2
        padding .35rem 0
        font-size .4rem
        color #333
        line-height .53rem
    .line_3
        .flex_grow_1
            width 2.62rem
            height 2.62rem
            background #F5F5F5
        .center_box
            margin 0 .44rem
    .line_4
        padding .7rem 0 .37rem
        .flex_grow_1
            font-size .27rem
            color #333

.list_item
    padding .4rem .6rem
    .line_1
        align-items flex-start
        .flex_grow_1
            span.uname
                font-size:.42rem;
                color:#333;
                font-family:PingFang SC;
                margin-right: .11rem;
            img
                width .6rem
                height .6rem
                vertical-align middle
            .zhuan_img
                margin-right .19rem
        .time
            color #333;
            font-size .32rem
    .line_2
        padding .35rem 0
        .text_s
            font-size .4rem
            color #333
            line-height .53rem
</style>

