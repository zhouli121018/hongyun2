<template>
    <div>
        <title-bar title_name="专家名称"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="option" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <div class="flex list_item">
            <div class="img_box">
                <img src="http://sscby.cn/zzh/defaulticon.png" alt="">
            </div>
            <div class="flex_grow_1 content_box">
                <div class="line_1">
                    <span class="uname">用户名</span>
                    <img class="zhuan_img" src="../../assets/zhuan.png" alt="">
                    <img src="../../assets/vip.png" alt="">
                </div>
                <div class="line_2">
                    <span>粉丝: 200</span><span  style="padding:0 0 0 .3rem">查看：222</span>
                </div>
            </div>
            <van-button style="float:right;margin-right:.39rem;background:#87AC55;color:#fff" size="mini"> 关注</van-button>
        </div>
        <div class="xian"></div>
        <van-tabs v-model="num_active" :swipe-threshold="7" v-if="poslist && poslist.length>0" @click="change_pos" class="no_bottom_border border_color">
            <van-tab v-for="(p,index) in poslist" :key="index" :title="p.name">
            <div slot="title">
                <img v-if="num_active==index" src="../../assets/an.png" alt="" style="position:absolute;width:0.5rem;left:50%;bottom:0;margin-left:-0.25rem;">
                <span style="padding-bottom:6px;">{{p.name}}</span>
            </div>
            </van-tab>
        </van-tabs>
        <div class="flex fangan_box" v-if="ycplaytypes.length>0">
            <div v-for="(item,k) in ycplaytypes" :key="k" @click="change_yc(k)">
            <van-button :class="{mian_bgcolor:yc_active==k}" type="default" size="large">{{item.ycplayname}}</van-button>
            </div>
        </div>
        <div class="xian"></div>
        <div>
            <div class="expertsname_box">
                <div><span>第2101期</span><span class="pink">等待开奖</span></div>
                <div>
                    <van-button style="background:#FFCB43;color:#FF115F;border-radius: 1rem;border:none;height:1rem;line-height:1rem;font-size:12px" round size="normal">查看预测10金币</van-button>
                </div>
            </div>
            <div class="xian"></div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            option_value:'a',
            option: [
                { text: '七星彩', value: 'a' },
                { text: '七星彩1', value: 'b' },
                { text: '七星彩2', value: 'c' },
            ],
            num_active:0,
            yc_active:0,
            poslist:[
                {
                    name: "头位",
                    type: 101,
                    ycplaytypes:[
                        {ycplaytype: 103, ycplayname: "杀三码"},
                        {ycplaytype: 106, ycplayname: "杀六码"},
                        {ycplaytype: 110, ycplayname: "杀十码"}
                    ]
                },
                {
                    name: "球杀码",
                    type: 102,
                    ycplaytypes:[
                        {ycplaytype: 106, ycplayname: "杀六码"},
                        {ycplaytype: 110, ycplayname: "杀十码"}
                    ]
                },
            ],
            ycplaytypes:[
                {ycplaytype: 103, ycplayname: "杀三码"},
                {ycplaytype: 106, ycplayname: "杀六码"},
                {ycplaytype: 110, ycplayname: "杀十码"},
                {ycplaytype: 104, ycplayname: "杀三码"},
                {ycplaytype: 107, ycplayname: "杀六码"},
                {ycplaytype: 118, ycplayname: "杀十码"}
            ],
        }
    },
    methods: {
        change_lottype(val){
            this.$toast(val)
        },
        change_lottype(val){
            this.$toast(val)
        },
        change_pos(index){
            this.num_active = index;
            this.yc_active = 0;
        },
        change_yc(index){
            this.yc_active = index;
        },
    }
}
</script>

<style scoped lang="stylus">
.expertsname_box
    padding .35rem .25rem
    box-sizing border-box
    div:first-child
        border-bottom 1px solid #e3e3e3
        padding .2rem 0
        margin-bottom .4rem
        span 
            width 35%
            display inline-block
    div:last-child 
        text-align center
.fangan_box
    padding .2rem  
    flex-wrap wrap
    margin-bottom 1.2rem
    >div
      width 25%
      box-sizing border-box
      padding .2rem .1rem
      button
        height .8rem 
        line-height .8rem 
        font-size .4rem
.van-button--mini 
    display: inline-block;
    min-width: 58px;
    height: 28px;
    font-size: 13px;
.list_item
    padding .4rem 0
    align-items flex-start
    border-bottom 1px solid #e3e3e3
    margin-bottom 1.2rem
    .img_box 
        padding 0 .28rem
        img
            width 1.12rem
            height 1.12rem
    .content_box
        span.uname
            font-size:.42rem;
            color:#333;
            font-family:PingFang SC;
            margin-right: .68rem;
        img
            width .56rem
            height .56rem
            vertical-align middle
        .zhuan_img
            margin-right .19rem
        .line_2
            padding .23rem 0 .28rem
            color #666
            font-family:PingFang SC;
            font-size .37rem
</style>
