<template>
    <div>
        <title-bar title_name="彩友圈" right_text="发表" right_url="/home/publish"/>
        <div class="top_menu">
            <span class="item plq" :class="{active:areatype==0}" @click="change_area(0)">评论区</span>
            <span class="item" :class="{active:areatype==1}" @click="change_area(1)">晒奖区</span>
        </div>
        <div class="newest">
            <span class="item first" :class="{active:timetype==0}" @click="change_time(0)">最新</span>
            <span class="item" :class="{active:timetype==1}" @click="change_time(1)">最热</span>
        </div>
        
        <div  v-for="(item,index) in list" :key="index">
            <div class="content_item">
                <div class="flex line_1">
                    <img src="http://sscby.cn/hysm/defaulticon.png" alt="">
                    <div class="flex_grow_1">
                        <div class="uname">{{item.username}}</div>
                        <div class="time">{{item.ptime}}</div>
                    </div>
                </div>
                <div class="line_2">{{item.content}}</div>
                <div class="flex line_3">
                    <div class="img_box" :class="{center_box:(i%3==1)}" v-for="(m,i) in item.imgs" :key="i"></div>
                    <!-- <div class="img_box" :class="{center_box:((i+2)%3==1)}" v-for="(m,i) in item.imgs" :key="2+i"></div>
                    <div class="img_box" :class="{center_box:((i+4)%3==1)}" v-for="(m,i) in item.imgs" :key="4+i"></div> -->
                </div>
                <div class="flex line_4">
                    <div class="flex_grow_1" v-if="item.loca"><img src="~@/assets/dingwei.png" alt="1" style="width:.26rem"> {{item.loca}}</div>
                    <div class="flex_grow_1"><img src="~@/assets/pinglun.png" alt="1" style="width:.33rem"> 评论({{item.dtimes}})</div>
                    <div class="flex_grow_1"><img src="~@/assets/zhuanfa.png" alt="1" style="width:.36rem"> 转发({{item.stimes}})</div>
                    <div class="flex_grow_1"><img src="~@/assets/dianzan.png" alt="1" style="width:.3rem"> 点赞({{item.ztimes}})</div>
                </div>
            </div>
            <div style="background:#F5F5F5;height:0.2rem;"></div>
        </div>
        

    </div>
</template>

<script>
import {gettiezilist } from '@/api/home'
export default {
    data(){
        return {
            list:[],
            isFirstEnter:false,
            areatype:0, //0讨论区，1晒奖区 
            timetype:0, //0最新，1最热
            lastid:0
        }
    },
    methods:{
        change_area(area){
            this.areatype = area;
            this.lastid = 0;
            this.gettiezilist();
        },
        change_time(time){
            this.timetype = time;
            this.lastid = 0;
            this.gettiezilist();
        },
        async gettiezilist(){
            let obj = {
                areatype:this.areatype,  
                timetype:this.timetype, 
                lastid:this.lastid
            };
            const {data} = await gettiezilist(obj)
            this.list = data.list;
        },
    },
    created(){
        this.isFirstEnter=true;
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.gettiezilist();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
        
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
        flex-wrap wrap
        .img_box
            width 2.62rem
            height 2.62rem
            background #F5F5F5
            margin-bottom .2rem
            &.center_box
                margin 0 .4rem .2rem
    .line_4
        padding .7rem 0 .37rem
        .flex_grow_1
            font-size .27rem
</style>

