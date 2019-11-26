<template>
    <div>
        <title-bar title_name="我的查看"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value1" :options="issues[this.option_value]" @change="change_issue" />
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        
        <div class="">
            <van-tabs v-model="pos_active" :swipe-threshold="7" v-if="postype && postype.length>0" @click="change_pos" class="no_bottom_border border_color">
                <van-tab v-for="(p,index) in postype" :key="index" :title="p.posname">
                <div slot="title">
                    <img v-if="pos_active==index" src="../../assets/an.png" alt="" style="position:absolute;width:0.5rem;left:50%;bottom:0;margin-left:-0.25rem;">
                    <span style="padding-bottom:6px;">{{p.posname}}</span>
                </div>
                </van-tab>
            </van-tabs>
            <div class="flex fangan_box" v-if="playtype.length>0">
                <div v-for="(item,k) in playtype" :key="k" @click="change_play(k)">
                <van-button :class="{mian_bgcolor:play_active==k}" type="default" size="large">{{item.playname}}</van-button>
                </div>
            </div>
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <div>
            <div v-for="(item,index) in list" :key="index">
                <div  class="flex list_item">
                    <div class="img_box">
                        <img :src="$https+item.icon" alt="">
                    </div>
                    <div class="flex_grow_1 content_box">
                        <div class="line_1">
                            <span class="uname">{{item.username}}</span>
                            <img v-if="item.isexp == 1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img v-if="item.isvip == 1" src="../../assets/vip.png" alt="">
                        </div>
                        <div class="line_2">
                            <span>粉丝: {{item.fans}}</span><span style="padding-left:.3rem;">{{item.viewtimes}}次查看</span>
                        </div>
                        <div class="line_3">
                            {{item.issue}}期    
                            <span style="display:inline-block;padding-left:.5rem" v-html="item.content"></span>
                            <!-- <span>上期预测杀3码: 3 3 <span style="color:#FF0B60">9</span></span><van-icon name="success" color="#FF0B60" style="margin-left:.71rem;"/> -->
                        </div>
                    </div>
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { getmyviewpred } from '@/api'
import {gethome_global} from '@/utils'
export default {
    data(){
        return {
            option_value:'a',
            lottype:[],
            pos_active:0,
            play_active:0,
            postype:[],
            playtype:[],
            list:[],
            isFirstEnter:false,
            option_value1: '',
            issues: []
        }
    },
    methods:{
        // 选择彩种
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
            this.option_value1 = this.issues[this.option_value][0].value
            this.getmyviewpred();
        },
        //选择期数
        change_issue(val){
            console.log(val)
            this.getmyviewpred();
        },
        change_pos(index){
            this.pos_active = index;
            this.play_active = 0;
            this.playtype = this.postype[this.pos_active].playtype
            this.getmyviewpred();
        },
        change_play(index){
            this.play_active = index;
            this.getmyviewpred()
        },
        async getmyviewpred() {
            const { data } = await getmyviewpred({
                sid: localStorage.getItem('hsid'),
                uid: localStorage.getItem('huid'),
                issue: this.option_value1,
                lottype: this.option_value,
                postype:this.postype[this.pos_active].postype,
                playtype:this.postype[this.pos_active].playtype[this.play_active].playtype
            })
            this.list = data.list
        }
    },
    created(){
        this.isFirstEnter=true;
        
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
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
                    this.postype = this.lottype[0].postype;
                    this.playtype = this.postype[0].playtype
                    let issues = this.$store.getters.homeData.issues
                    for(let key in issues){
                    this.issues[key] = []
                    issues[key].map(item=>{
                        this.issues[key].push({
                            value:item,
                            text:'第 '+item+' 期'
                        })
                    })
                }
                this.option_value1 = this.issues[this.option_value][0].value
                    this.getmyviewpred();
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
                this.postype = this.lottype[0].postype;
                this.playtype = this.postype[0].playtype
                let issues = this.$store.getters.homeData.issues
                    for(let key in issues){
                    this.issues[key] = []
                    issues[key].map(item=>{
                        this.issues[key].push({
                            value:item,
                            text:'第 '+item+' 期'
                        })
                    })
                }
                this.option_value1 = this.issues[this.option_value][0].value
                // this.getpredrank();
                this.getmyviewpred()
            }
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
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
    width: 6.8rem;
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

