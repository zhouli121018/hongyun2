<template>
    <div>
        <title-bar title_name="搜索"/>
        <div class="">
            <div class="search_box">
                <input v-model="keyword" placeholder="请输入号码或梦境关键词" />
                <img @click="getsearchlist" src="../../assets/sreach_img.png" alt="">
            </div>
            <div style="width:90%;margin:0 auto;padding:.1rem 0 .3rem;font-size:.37rem;color:#666;">热搜专家: 
                <span v-for="(h,index) in hotlist" :key="index" @click="onSearch(h)">{{h+' '}}</span>
            </div>
           
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>

        <div>
            <div v-for="(item,index) in list" :key="index">
                <div  class="flex list_item" @click="goExp('/personal/expertsname')">
                    <div class="img_box">
                        <img src="http://sscby.cn/hysm/defaulticon.png" alt="">
                    </div>
                    <div class="flex_grow_1 content_box">
                        <div class="line_1">
                            <span class="uname">{{item.username}}</span>
                            <img v-if="item.isexp==1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img v-if="item.isvip==1" src="../../assets/vip.png" alt="">
                            <van-button round  @click.stop="follow_playtype(item)" style="float:right;margin-right:.39rem;" size="mini"><van-icon v-if="item.isfollow==0" name="plus" /> {{item.isfollow==0?'关注':'取消关注'}}</van-button>
                        </div>
                        <div class="line_2">
                            <span>粉丝: <span style="color:#FE8F00">{{item.fans}}</span></span><span  style="padding:0 0 0 .3rem">查看次数：{{item.viewtimes}}</span>
                        </div>
                    </div>
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>
            
        </div>

    </div>
</template>

<script>
import {getsearchlist,follow_playtype } from '@/api/home'
export default {
    data(){
        return {
            list:[],
            keyword:'',
            hotlist:[],
        }
    },
    methods:{
        async follow_playtype(item){
            let type = 0;
            if(item.isfollow==0){
                type = 1;
            }
            let obj = {
                lottype:this.$route.query.lottype,
                postype:this.$route.query.postype,
                playtype:this.$route.query.playtype,
                expid:item.userid,
                type:type
            }
            const {data} = await follow_playtype(obj)
            if(data.errorcode == 0){
                item.isfollow = type
            }
        },
        goExp(path){
            this.$router.push({
                path:path,
                query:{
                    lottype:this.$route.query.lottype,
                    postype:this.$route.query.postype,
                    playtype:this.$route.query.playtype,
                }
            })
        },
        onSearch(h){
            this.keyword = h;
            this.getsearchlist();
        },
        async getsearchlist(){
            let obj = {
                keyword:this.keyword
            }
            const {data} = await getsearchlist(obj);
            this.list = data.list;
            this.hotlist = data.hotlist;
        },
    },
    created(){
        this.isFirstEnter=true;
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getsearchlist();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
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

