<template>
    <div>
        <title-bar title_name="彩友圈"/>
        <div class="top_menu">
            <span class="item plq active">评论区</span>
            <span class="item">晒奖区</span>
        </div>
        <div class="newest">
            <span class="item first active">最新</span>
            <span class="item">最热</span>
        </div>
        
        <div  v-for="(item,index) in list" :key="index">
            <div class="content_item">
                <div class="flex line_1">
                    <img src="http://sscby.cn/hysm/defaulticon.png" alt="">
                    <div class="flex_grow_1">
                        <div class="uname">用户名</div>
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
        </div>
        

    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {},{}
            ],
        }
    },
    methods:{
        onSearch(){}
    }
        
}
</script>

<style lang="stylus" scoped>
.top_menu
    padding .4rem .6rem 0
    border-bottom 2px solid #E3E3E3
    .item
        color #333333
        font-size .48rem
        border-bottom 3px solid transparent
        padding-bottom .3rem
        display: inline-block;
        &.plq
            margin-right .92rem
        &.active
            color #87AC55
            border-bottom 3px solid #87AC55

.newest
    padding .4rem .6rem
    text-align right
    .item
        color #CCCCCC
        font-size .37rem
        &.first
            margin-right .67rem
        &.active
            color #87AC55
.content_item
    padding .4rem .6rem
    
    .line_1
        .flex_grow_1
            padding-left .23rem
        .uname
            font-size .43rem
            color #333
            padding-bottom .35rem
        .time
            font-size .32rem
        img
            width 1.45rem
            height 1.45rem
    .line_2
        padding .35rem 0
        font-size .4rem
        color #333
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
</style>

