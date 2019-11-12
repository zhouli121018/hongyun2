<template>
    <div >
        <div style="position:absolute;top:50px;bottom:1.5rem;left:0;right:0;overflow: auto;">
            <title-bar title_name="评论"/>
            <div class="content_item" v-if="info"> 
                <div class="flex line_1" @click="goSingle">
                    <img :src="$https_img+'/'+info.icon" alt="">
                    <div class="flex_grow_1">
                        <div>
                            <span class="uname">{{info.username}}</span>
                            <img v-if="info.isexp==1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img v-if="info.isvip==1" src="../../assets/vip.png" alt="">
                        </div>
                        
                        <div class="time">{{info.ptime}}</div>
                    </div>
                </div>
                <div class="line_2">{{info.content}}</div>
                <div class="flex line_3">
                    <div class="img_box"  :class="{center_box:(i%3==1)}" v-for="(m,i) in info.imgs" :key="i" @click="prev_img(i)">
                        <img :src="$https_img+'/'+m" alt="" style="width:100%;">
                    </div>
                </div>
                <div class="flex line_4">
                    <div class="flex_grow_1" v-if="info.loca"><img src="~@/assets/dingwei.png" alt="1" style="width:.26rem"> {{info.loca}}</div>
                    <div class="flex_grow_1"><img src="~@/assets/pinglun.png" alt="1" style="width:.33rem"> 评论({{info.dtimes}})</div>
                    <div class="flex_grow_1 m-share" @click="pop"><img src="~@/assets/zhuanfa.png" alt="1" style="width:.36rem"> 转发({{info.stimes}})</div>
                    <div class="flex_grow_1" @click="submit_like"><img src="~@/assets/dianzan.png" alt="1" style="width:.3rem"> 点赞({{info.ztimes}})</div>
                </div>
            </div>
            <div style="background:#F5F5F5;height:0.2rem;"></div>
            <div v-for="(item,index) in list" :key="index">
                <div class="list_item">
                    <div class="flex line_1">
                        <div class="flex_grow_1">
                            <div>
                                <span class="uname">{{item.username}}</span>
                                <img v-if="info.isexp==1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                                <img v-if="info.isvip==1" src="../../assets/vip.png" alt="">
                            </div>
                        </div>
                        <div class="time">{{item.ptime}}</div>
                    </div>
                    <div class="line_2">
                        <span class="text_s">{{item.content}}</span> 
                        <van-button v-if="item.soundurl" style="background:#87AC55;color:#fff;width:2.76rem;font-size:.24rem;height:.73rem;line-height:.425rem;border-radius:.08rem;"><img src="~@/assets/yuyin.png" alt="1" style="width:.3rem;"> 点击听语音</van-button>
                        <img src="~@/assets/pinglun.png" alt="1" style="width:.33rem;float:right">
                    </div>
                    <div  v-if="item.parentItem" style="background:#EDEDED;position:relative;padding:.35rem .36rem;color:#666666;border-radius:.08rem;">
                        <div>
                            <span style="color:#FF0B60;font-size:.4rem;">@{{item.parentItem.username}}</span>
                            <span style="font-size:.35rem">{{item.parentItem.ptime}}</span>
                            <div style="padding:.36rem 0 .2rem;font-size:.35rem;">
                                {{item.parentItem.content}} 
                                <van-button v-if="item.parentItem.soundurl" style="background:#87AC55;color:#fff;width:2.76rem;font-size:.24rem;height:.73rem;line-height:.425rem;border-radius:.08rem;"><img src="~@/assets/yuyin.png" alt="1" style="width:.3rem;"> 点击听语音</van-button>
                            </div>
                        </div>
                        <div style="width:0;height: 0;border-width: .3rem;border-style: solid;border-color: transparent transparent #EDEDED transparent;position:absolute;top:-.6rem;left:.3rem;"></div>
                    </div>
                    
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>

            <div style="color:#a4d068;text-align:center;padding:.4rem 0;" v-if="lastid>0" @click="load_more"> 加载更多</div>
        </div>
        

        <div class="flex" style="background:#E9E9E9;height:1.4rem;position:absolute;bottom:0;width:100%;">
            <img src="~@/assets/luyin.png" style="width:0.45rem;height:0.64rem;margin:0 .3rem;" alt="" >
            <van-field style="border-radius:.1rem;"
                v-model="value" maxlength="200"  show-word-limit
                clearable
                placeholder="我也说说...(最多200字以内）"
            >
            </van-field>
            <van-button size="small" color="#87AC55" style="margin:0 .3rem;border-radius:.1rem;">发布</van-button>
        </div>

    </div>
</template>

<script>
import {gettiezi_disclist, submit_like } from '@/api/home'
import { ImagePreview } from 'vant';
import Mshare from 'm-share'
export default {
    data(){
        return {
           list:[],
           isFirstEnter:false,
           lastid:0,
           jubos:[],
           info:null,
           show_img:false,
           big_imgs:[],
           value:''
        }
    },
    methods:{
        goSingle(){
            this.$router.push({
                path:'/home/single_caoyouquan',
                query:{
                    expid:this.info.userid
                }
            })
        },
        prev_img(index){
            ImagePreview({
                images:this.big_imgs,
                startPosition: index,
            });
        },
        onChange(index) {
            this.index = index;
        },
        async gettiezi_disclist(){
            let ishead = 1;
            if(this.lastid>0){
                ishead = 0;
            }
            let obj = {
                tid:this.$route.query.tid,  
                ishead:ishead, 
                lastid:this.lastid
            };
            const {data} = await gettiezi_disclist(obj)

            this.big_imgs = [];
            if(data && data.big_imgs && data.big_imgs.length>0){
                data.big_imgs.forEach(val=>{
                    this.big_imgs.push(this.$https_img+'/'+val)
                })
            }
            this.info = data;
            if(this.lastid > 0){
                this.list = data.list.concat(this.list);
            }else{
                this.list = data.list
            }
            this.lastid = data.lastid;
            
            this.jubos = data.jubos;
        },
        load_more(){
            this.gettiezi_disclist();
        },

        //点赞
        async submit_like(){
            let obj = {
                tid:this.info.tid,
            }
            const {data} = await submit_like(obj);
            this.info.ztimes = data.zannum
        },
        //转发
        pop(){
            const config = {
                link:  '', // 网址，默认使用window.location.href  http://www.qq.com
                title: '标题',  // 标题，默认读取document.title 
                desc:  '分享描述', // 描述, 默认读取<meta name="description" content="desc" />
                imgUrl: 'http://punchingtop.com/bysq/defaulticon.png' ,// 图片, 默认取网页中第一个img标签
                types: ['wx', 'wxline', 'qq', 'qzone', 'sina'], // 启用的社交分享,默认为全部启用
                infoMap: { // 针对不同平台设定不同分享内容
                    wx: {
                    link: '', // 覆盖分享到微信的链接
                    title: '1234', // 覆盖分享到微信的标题
                    desc: '开始的佛撒旦法', // 覆盖分享到微信的标题
                    imgUrl: 'http://punchingtop.com/bysq/admin/uicon/1561707470151.jpg' // 覆盖分享到微信的图片链接
                    }
                },
                fnDoShare(type) {
                    // 执行分享的回调，type为'wx', 'wxline', 'qq', 'qzone', 'sina'
                }
            };
            this.config = config;
            Mshare.popup( this.config);
        },
    },
    
    created(){
        this.isFirstEnter=true;
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.lastid = 0;
            this.gettiezi_disclist();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
        
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

