<template>
    <div>
        <title-bar title_name="过滤"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="option" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <div class="fil_box">
            <span>过滤条件：</span>
            <select class="select">
                <option value="1">第一位落码</option>
                <option value="2">第二位落码</option>
            </select>
            <img src="~@/assets/plus.png" alt="" style="width:.6rem;">
        </div>
        <div style="color:#FF0B60;background:#F5F5F5;font-size:.32rem;padding:.27rem .56rem">
            特殊要求加微信：xxxkd
        </div>
        <div style="padding:0 .56rem;">
            <div v-for="(item,index) in list" :key="index" style="font-size:.373rem;color:#333333;padding:.3rem 0;border-bottom:2px solid #E3E3E3;line-height:.5rem">
                <img src="~@/assets/min.png" alt="" style="width:.48rem;">
                 第1位落码
            </div>
        </div>
        <div class="text_center" style="padding:.35rem 0;">
            <van-button style="width:4.03rem;height:1.21rem;background:#87AC55;border-radius:.2rem;color:#fff;font-size:0.53rem;line-height:0.8rem;">过滤</van-button>
        </div>
        <div style="background:#F5F5F5;height:0.27rem;"></div>
        <div style="padding:.4rem .56rem;">
            <div style="padding-bottom:.27rem;">
                <span style="font-size:0.37rem;color:#333333">过滤结果</span> 
                <span style="float:right;font-size:0.37rem;color:#FF0B60">复制</span>
            </div>
            <div style="font-size:0.29rem;color:#333333;line-height:0.6rem;text-align:justify">
                1123   2313   3131  4567   334   8272   2292   4242   4232   1123   2313   3131  4567   334   8272   2292   4242   4232   4334   2313   3131  4567   334   8272   2292   4242   4232   1123   2313   2313   3131  4567   334   8272   2292   4242   4232   334   8272   2292   4242   4232   4334   2313   2313   3131  4567   334   8272   2292   4242   4232   4334   2313   3131  4567   334   8272   2292   4242   4232   1123   2313   3131  4567   334   8272   2292   4242   4232   4334
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

            list:[
                {},{},{},{}
            ]
        }
    },
    methods:{
        change_lottype(val){
            this.$toast(val)
        },
    },
    created(){
        
        
    }
        
}
</script>

<style lang="stylus" scoped>
.fil_box
    padding .12rem .56rem
.select
    background: #fff;
    border: 2px solid #E3E3E3;
    border-radius: .12rem;
    outline: none;
    width: 4.67rem;
    height: .92rem;
    text-align: center;
    padding: 0 1rem;
// 右上角下拉菜单样式 start
/deep/ .van-dropdown-item.van-dropdown-item--down
    top 50px !important
.right_button
    width: 2.4rem;
    position: absolute;
    top: 10px;
    right: 8px;
    z-index: 1000;
    /deep/ .van-dropdown-menu  
        background #A4D068
        height 26px
        border-radius 5px
        .van-dropdown-menu__title 
            color #fff
            .van-ellipsis
                font-size .32rem
        // .van-dropdown-menu__title::after
        //     background: url('../../assets/dropdown_caret.png') no-repeat;
        //     display:inline-block;
        //     width:.36rem;
        //     height:.23rem;
        //     background-size:100%;
        //     border:none;
        //     transform: rotate(0deg);
        //     right: -10px;
        //     margin-top: -4px;
// 右上角下拉菜单样式 end

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
            padding-bottom .28rem
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

