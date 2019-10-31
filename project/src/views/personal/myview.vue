<template>
    <div>
        <title-bar title_name="我的查看"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value1" :options="option1" @change="change_lottype" />
                <van-dropdown-item v-model="option_value" :options="option" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        
        <div class="">
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
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <div>
            <div v-for="(item,index) in list" :key="index">
                <div  class="flex list_item">
                    <div class="img_box">
                        <img src="http://sscby.cn/hysm/defaulticon.png" alt="">
                    </div>
                    <div class="flex_grow_1 content_box">
                        <div class="line_1">
                            <span class="uname">用户名</span>
                            <img class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img src="../../assets/vip.png" alt="">
                        </div>
                        <div class="line_2">
                            <span>粉丝: 200</span><span style="padding-left:.3rem;">1万次查看</span>
                        </div>
                        <div class="line_3">
                            <span>上期预测杀3码: 3 3 <span style="color:#FF0B60">9</span></span><van-icon name="success" color="#FF0B60" style="margin-left:.71rem;"/>
                        </div>
                    </div>
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            option_value:'a',
            option: [
                { text: '七星彩', value: 'a' },
                { text: '七星彩1', value: 'b' },
                { text: '七星彩2', value: 'c' },
            ],
            option_value1:'a',
            option1: [
                { text: '第789期', value: 'a' },
                { text: '第1548期', value: 'b' },
                { text: '第1487期', value: 'c' },
            ],
            tabs_active:0,
            num_active:0,
            yc_active:0,
            poslist:[
                {
                    name: "红球杀码",
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
            list:[
                {},{},{}
            ]
        }
    },
    methods:{
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

<style lang="stylus" scoped>
// 右上角下拉菜单样式 start
/deep/ .van-dropdown-item.van-dropdown-item--down
    top 50px !important
.right_button
    /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
            border none
    width: 4.8rem;
    position: absolute;
    top: 10px;
    right: 8px;
    z-index: 1000;
    /deep/ .van-dropdown-menu  
        background #88A125
        height 26px
        border-radius 5px
        .van-dropdown-menu__item
            background #a4d068
            border-radius .2rem
        .van-dropdown-menu__item:first-child
            margin-right .2rem
        .van-dropdown-menu__title 
            color #fff
            .van-ellipsis
                font-size .32rem
// 右上角下拉菜单样式 end

/deep/ .van-nav-bar__title.van-ellipsis
    display:none;

.list_item
    padding .4rem 0
    align-items flex-start
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
        /deep/ .line_1 .van-button
            border-radius: 10em;
            font-size .32rem
            width 1.53rem
            height 0.62rem
            line-height .55rem
            border:2px solid rgba(247,247,247,1);
        .line_2
            padding .23rem 0 .28rem
            color #666
            font-family:PingFang SC;
            font-size .37rem
        .line_3,.line_4
            color #333
            font-family:PingFang SC;
            font-size .37rem
        .line_4
            padding-bottom 0
        .line_5
            padding-top .28rem
            span.color_red
                color #FF0B60
            /deep/ .van-button
                font-size .3rem
                padding-left .3rem
                padding-right .3rem

/deep/ .van-tabs__nav.van-tabs__nav--line .van-tab--active
    span
        color:#87ac55;
        font-size .4rem
.van-tabs__nav.van-tabs__nav--line
    span
        font-weight bold
        font-size .35rem
.fangan_box
    padding .2rem  
    flex-wrap wrap
    >div
      width 25%
      box-sizing border-box
      padding .2rem .1rem
      button
        height .8rem 
        line-height .8rem 
        font-size .4rem
.text_center
    // margin-bottom .2rem
    text-align center
    background #fff
.no_border{
    border:none;
  }
.btn_group button
    margin-top .2rem
.text_box{
    padding:.3rem .2rem;
}
.rank_item{
    padding:.2rem
    border-top:1px solid #F0F0F0;
  }
.gary
    color #666
    padding .1rem 0
    font-size .36rem
.rank_item_bottom
    padding .1rem 0
.border_color
  margin-bottom .2rem
</style>

