<template>
    <div>
        <title-bar title_name="我关注的彩友"/>
        <div>
            <div v-for="(item,index) in list" :key="index">
                <div  class="flex list_item" @click="goExp(item)">
                    <div class="img_box">
                        <img :src="$https+item.icon" alt="">
                    </div>
                    <div class="flex_grow_1 content_box">
                        <div class="line_1">
                            <span class="uname">{{item.username}}</span>
                            <van-button round  @click.stop="follow_tiezi(item.userid)" style="float:right;margin-right:.39rem;" size="mini">取消关注</van-button>
                        </div>
                        <div class="line_2">
                            <span>发帖数: <span>{{item.tie_num}}</span></span><span  style="padding:0 0 0 .3rem">粉丝: {{item.fans_tie}}</span>
                        </div>
                    </div>
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getmyfollowCaiyou, followTieziUser } from '@/api'
export default {
    data() {
        return {
            lastid: 0,
            list: []
        }
    },
    methods: {
        async getmyfollowCaiyou() {
            const { data } = await getmyfollowCaiyou({
                sid: localStorage.getItem('hsid'),
                uid: localStorage.getItem('huid'),
                lastid: this.lastid
            })
            this.list = data.list
            this.lastid = data.lastid
        },
        //取消关注
        async follow_tiezi(userid) {
            const { data } = await followTieziUser({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                expid: userid,
                type: 0
            })
            if(data.errorcode == 0) {
                this.lastid = 0
                this.getmyfollowCaiyou()
            }
        }
    },
    mounted() {
        this.getmyfollowCaiyou()
    }
}
</script>

<style lang="stylus" scoped>
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
