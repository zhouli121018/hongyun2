<template>
    <div>
        <title-bar :title_name="username"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <div class="flex list_item" v-if="info">
            <div class="img_box">
                <img :src="$https_img+info.icon" alt="" >
            </div>
            <div class="flex_grow_1 content_box">
                <div class="line_1">
                    <span class="uname">{{info.username}}</span>
                    <img v-if="info.isexp==1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                    <img v-if="info.isvip==1" src="../../assets/vip.png" alt="">
                </div>
                <div class="line_2">
                    <span>粉丝: {{info.fans}}</span><span  style="padding:0 0 0 .3rem">查看：{{info.viewtimes}}</span>
                </div>
            </div>
            <van-button @click.stop="follow_playtype" style="float:right;margin-right:.39rem;background:#87AC55;color:#fff;width:2rem" size="mini">{{info.isfollow==0?'关注':'取消关注'}}</van-button>
        </div>
        <div style="padding:.3rem .2rem;margin:0 .4rem .4rem;border:1px solid #E3E3E3;border-radius:.1rem;min-height:1.39rem;">
            {{info.jianjie}}
        </div>
        <div style="height:.27rem;background:#F5F5F5"></div>
        <van-tabs v-model="pos_active" :swipe-threshold="7" v-if="postype && postype.length>0" @click="change_pos" class="no_bottom_border border_color">
            <van-tab v-for="(p,index) in postype" :key="index" :title="p.posname">
            <div slot="title">
                <img v-if="pos_active==index" src="../../assets/an.png" alt="" style="position:absolute;width:0.36rem;height:.23rem;left:50%;bottom:0;margin-left:-0.15rem;">
                <span style="padding-bottom:6px;">{{p.posname}}</span>
            </div>
            </van-tab>
        </van-tabs>
        <div class="flex fangan_box" v-if="playtype.length>0">
            <div v-for="(item,k) in playtype" :key="k" @click="change_play(k)">
            <van-button :class="{mian_bgcolor:play_active==k}" type="default" size="large">{{item.playname}}</van-button>
            </div>
        </div>
        <div style="height:.27rem;background:#F5F5F5"></div>
        <div v-for="(item,index) in list" :key="index">
            <div class="expertsname_box">
                <div><span>第{{item.issue}}期</span><span v-html="item.kjnum"></span></div>
                <div>
                    <van-button v-if="item.cid >0 " @click="viewpre(item)" style="background:#FFCB43;color:#FF115F;border-radius: 1rem;border:none;height:1rem;line-height:1rem;font-size:.37rem;width:3rem;" round size="normal">  查看预测 </van-button>
                    <p v-else style="text-align:left;padding-left:.25rem;" v-html="item.pred"></p>
                </div>
            </div>
            <div style="height:.27rem;background:#F5F5F5"></div>
        </div>
        <div style="color:#a4d068;text-align:center;padding:.4rem 0;" v-if="lastid>0" @click="getexpert"> 加载更多</div>
        
    </div>
</template>

<script>
import { Dialog } from 'vant';
import {gethome_global} from '@/utils'
import {getexpert, view_pred,follow_playtype } from '@/api/home'
export default {
    data() {
        return {
            option_value:'a',
            lottype:[],
            pos_active:0,
            play_active:0,
            postype:[],
            playtype:[],
            list:[],
            lastid:0,
            info:null
        }
    },
    methods: {
        async follow_playtype(){
            let item = this.info
            let type = 0;
            if(item.isfollow==0){
                type = 1;
            }
            let obj = {
                lottype:this.option_value,
                postype:this.postype[this.pos_active].postype,
                playtype:this.postype[this.pos_active].playtype[this.play_active].playtype,
                expid:this.$route.query.expid,
                type:type
            }
            const {data} = await follow_playtype(obj)
            if(data.errorcode == 0){
                this.info.isfollow = type
            }
        },
        viewpre(item){
            if(!localStorage.getItem('huid') || !localStorage.getItem('hsid')){
                this.$router.push('/login/index');
                return;
            }
            let str = ''
            if(item.isvip){
                str = '<p style="text-align: left;">会员查看预测不需要花费金豆，确定查看吗？</p>'
            }else{
                str = '<p style="text-align: left;">查看本次预测需花费您'+this.info.costjindou+'金豆，确定查看吗？</p>'
            }
            Dialog.confirm({
                title: '提示',
                message: str,
                cancelButtonText:'关闭'
            }).then(() => {
            // on confirm
                this.view_pred(item.cid)
            }).catch(() => {
            // on cancel
            });
        },
        async view_pred(cid){
            let obj = {
                cid:cid
            }
            const {data} = await view_pred(obj)
            if(data.content){
                Dialog.alert({
                    title: '提示',
                    message: data.content
                }).then(() => {
                // on close
                });
            }

        },
        change_lottype(val){
            for(let i = 0;i<this.lottype.length;i++){
                if(this.lottype[i].lottype == val){
                    this.pos_active = 0;
                    this.postype = this.lottype[i].postype;
                    break;
                }
            }
            this.pos_active = 0;
            this.play_active = 0;
            this.postype = this.lottype[0].postype;
            this.playtype = this.postype[this.pos_active].playtype
            this.$router.replace({
                path:'/personal/expertsname',
                query:{
                    lottype:this.option_value,
                    postype:this.postype[this.pos_active].postype,
                    playtype:this.postype[this.pos_active].playtype[this.play_active].playtype,
                    expid:this.$route.query.expid
                }
            })
            this.lastid = 0;
            this.getexpert();
        },
        change_pos(index){
            this.pos_active = index;
            this.play_active = 0;
            this.playtype = this.postype[this.pos_active].playtype
            this.$router.replace({
                path:'/personal/expertsname',
                query:{
                    lottype:this.option_value,
                    postype:this.postype[this.pos_active].postype,
                    playtype:this.postype[this.pos_active].playtype[this.play_active].playtype,
                    expid:this.$route.query.expid
                }
            })
            this.lastid = 0;
            this.getexpert();
        },
        change_play(index){
            this.play_active = index;
            this.$router.replace({
                path:'/personal/expertsname',
                query:{
                    lottype:this.option_value,
                    postype:this.postype[this.pos_active].postype,
                    playtype:this.postype[this.pos_active].playtype[this.play_active].playtype,
                    expid:this.$route.query.expid
                }
            })
            this.lastid = 0;
            this.getexpert();
        },
        async getexpert(){
            let obj = {
                lottype:this.option_value,
                postype:this.postype[this.pos_active].postype,
                playtype:this.postype[this.pos_active].playtype[this.play_active].playtype,
                expid:this.$route.query.expid,
                ishead:1, //是否获取头部信息（0不获取，1获取：昵称，头像，粉丝、专家标志、vip标志、简介、是否关注 信息）
                lastid:this.lastid
            }
            const {data} = await getexpert(obj);
            
            if(this.lastid > 0){
                this.list = data.list.concat(this.list);
            }else{
                this.list = data.list
            }

            this.lastid = data.lastid;
            this.info = data;
        }
    },
    created(){
        if(this.$store.getters.homeData == null){
            gethome_global().then(()=>{
                this.lottype = this.$store.getters.homeData.lottype
                this.lottype.map(item=>{
                    item.value = item.lottype
                    item.text = item.lotname
                })
                this.option_value = this.lottype[0].value
                this.pos_active = 0;
                this.play_active = 0;
                let lot_active = 0;
                if(this.$route.query.lottype){
                    this.option_value = this.$route.query.lottype
                    for(let i=0;i<this.lottype.length;i++){
                        if(this.lottype[i].lottype == this.$route.query.lottype){
                            lot_active = i;
                        }
                    }
                }
                this.postype = this.lottype[lot_active].postype;
                if(this.$route.query.postype){
                    for(let i=0;i<this.postype.length;i++){
                        if(this.postype[i].postype == this.$route.query.postype){
                            this.pos_active = i;
                        }
                    }
                }
                this.playtype = this.postype[this.pos_active].playtype
                if(this.$route.query.playtype){
                    for(let i=0;i<this.playtype.length;i++){
                        if(this.playtype[i].playtype == this.$route.query.playtype){
                            this.play_active = i;
                        }
                    }
                }
                this.getexpert();
            })
        }else{
            this.lottype = this.$store.getters.homeData.lottype
            this.lottype.map(item=>{
                item.value = item.lottype
                item.text = item.lotname
            })
            this.option_value = this.lottype[0].value
            this.pos_active = 0;
            this.play_active = 0;
            let lot_active = 0;
            if(this.$route.query.lottype){
                this.option_value = this.$route.query.lottype
                for(let i=0;i<this.lottype.length;i++){
                    if(this.lottype[i].lottype == this.$route.query.lottype){
                        lot_active = i;
                    }
                }
            }
            this.postype = this.lottype[lot_active].postype;
            if(this.$route.query.postype){
                for(let i=0;i<this.postype.length;i++){
                    if(this.postype[i].postype == this.$route.query.postype){
                        this.pos_active = i;
                    }
                }
            }
            this.playtype = this.postype[this.pos_active].playtype
            if(this.$route.query.playtype){
                for(let i=0;i<this.playtype.length;i++){
                    if(this.playtype[i].playtype == this.$route.query.playtype){
                        this.play_active = i;
                    }
                }
            }
            this.getexpert();
        }
    },
    computed:{
        username(){
            if(this.info){
                return this.info.username
            }else{
                return '专家名称'
            }
            
        }
    }
}
</script>

<style scoped lang="stylus">
.expertsname_box
    padding .35rem 0
    box-sizing border-box
    div:first-child
        border-bottom 1px solid #e3e3e3
        padding .2rem 0.25rem
        margin-bottom .4rem
        span 
            width 35%
            display inline-block
    div:last-child 
        text-align center
/deep/ .van-tabs__nav.van-tabs__nav--line .van-tab--active
    span
        color:#87ac55;
        font-size .43rem
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
.van-button--mini 
    display: inline-block;
    min-width: 58px;
    height: 28px;
    font-size: 13px;
.list_item
    padding .4rem 0 .3rem
    align-items center
    .img_box 
        padding 0 .28rem
        img
            width 1.32rem
            height 1.32rem
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
            padding .23rem 0 0
            color #666
            font-family:PingFang SC;
            font-size .37rem
</style>
