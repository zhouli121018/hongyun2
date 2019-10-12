<template>
    <div>
        <title-bar title_name="搜索"/>
        <div class="">
            <div class="search_box">
                <input v-model="keyword" placeholder="请输入号码或梦境关键词" />
                <img src="../../assets/sreach_img.png" alt="">
            </div>
            <div style="width:90%;margin:0 auto;padding:.1rem 0 .3rem;font-size:.37rem;color:#666;">热搜专家: *** *** ***</div>
           
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>

        <div>
            <div v-for="(item,index) in list" :key="index">
                <div  class="flex list_item">
                    <div class="img_box">
                        <img src="http://sscby.cn/zzh/defaulticon.png" alt="">
                    </div>
                    <div class="flex_grow_1 content_box">
                        <div class="line_1">
                            <span class="uname">用户名</span>
                            <img class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img src="../../assets/vip.png" alt="">
                            <van-button round  style="float:right;margin-right:.39rem;" size="mini"><van-icon name="plus" /> 关注</van-button>
                        </div>
                        <div class="line_2">
                            <span>粉丝: <span style="color:#FE8F00">200</span></span><span  style="padding:0 0 0 .3rem">查看次数：222</span>
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
            list:[
                {},{},{}
            ],
            keyword:''
        }
    },
    methods:{
        onSearch(){}
    }
        
}
</script>

<style lang="stylus" scoped>
/deep/ .van-search__content
    background #EDEDED
.search_box
    width 90%
    height 1.2rem
    margin .2rem auto
    background #EDEDED
    border-radius .5rem
    display flex
    justify-content space-between
    align-items center
    padding 0 .4rem
    box-sizing border-box
    input 
        width 90%
    img 
        width .52rem
        height .52rem
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

</style>

