<template>
    <div>
        <div class="fixed_title left_width_box">
        <van-nav-bar
          title="榜单"
          left-text=""
          class="title_box"
          @click-left="onClickLeft"
          >
          <van-icon name="search" slot="left" />
        </van-nav-bar>
        </div>
        <div class="right_button">
            <van-dropdown-menu>
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
                        <img src="http://sscby.cn/hysm/defaulticon.png" alt="">
                    </div>
                    <div class="flex_grow_1 content_box">
                        <div class="line_1">
                            <span class="uname">用户名</span>
                            <img class="zhuan_img" src="../../assets/zhuan.png" alt="" v-if="item.isexp==1">
                            <img src="../../assets/vip.png" alt="" v-if="item.isvip==1">
                            <van-button round  v-if="item.isfollow==0" @click="focus_btn(item)" style="float:right;margin-right:.39rem;" size="mini"><van-icon name="plus" /> 关注</van-button>
                        </div>
                        <div class="line_2">
                            <span>{{item.viewtimes}}次查看</span><span style="padding:0 .3rem">{{item.hittimes}}</span><span>粉丝: {{item.fans}}</span>
                        </div>
                        <div class="line_3">
                            <span v-html="item.prepred"></span>
                            <!-- <van-icon name="success" color="#FF0B60" style="margin-left:.71rem;"/> -->
                        </div>
                        <div class="line_4">
                            <span>上期预测杀3码: 3 3 9</span>
                        </div>
                        <div class="line_5">
                            <span class="color_red" @click="viewpre(item)">{{item.curpred}}</span>
                            <van-button v-if="ishemai==1" round  style="float:right;margin-right:.39rem;background:#87AC55;color:#fff;" size="small">转发合买</van-button>
                        </div>
                    </div>
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import {getpredrank } from '@/api/home'
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
            isFirstEnter:false
        }
    },
    methods:{
        focus_btn(item){
            let str = ''
            if(item.isvip){
                str = '<p style="text-align: left;">会员查看预测不需要花费金豆，确定查看吗？</p>'
            }else{
                str = '<p style="text-align: left;">查看本次预测需花费您'+item.jindou+'金豆，确定查看吗？</p>'
            }
            Dialog.confirm({
                message: str,
                cancelButtonText:'关闭'
            }).then(() => {
            // on confirm
            }).catch(() => {
            // on cancel
            });
        },
        viewpre(item){
            this.$toast(item.isviewcur)
        },
        onClickLeft(){
            this.$router.push('/home/search')
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
        },
        change_pos(index){
            this.pos_active = index;
            this.play_active = 0;
            this.playtype = this.postype[this.pos_active].playtype
        },
        change_play(index){
            this.play_active = index;
        },
        async getpredrank(){
            let obj = {
                lottype:this.option_value,
                postype:this.postype[this.pos_active].postype,
                playtype:this.postype[this.pos_active].playtype[this.play_active].playtype
            }
            const {data} = await getpredrank(obj);
            this.list = data.list;
        },
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
                    this.getpredrank();
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
                this.getpredrank();
            }
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    }
        
}
</script>

<style lang="stylus" scoped>
/deep/ .van-nav-bar__left .van-icon-search
    font-size .56rem
.title_box{
    background:red;
    color:#fff;
    background:url(../../assets/title.png);
    background-size: 100%;
  }
  .title_box .van-ellipsis.van-nav-bar__title{
    font-size:18px;
    color:#fff;
  }
  .title_box.van-nav-bar .van-icon, .title_box .van-nav-bar__text{
    color:#fff;
  }
  .fixed_title{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
  }
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

