<template>
    <div>
        <title-bar title_name="榜单"/>
        <div class="">
            <van-tabs v-model="num_active" :swipe-threshold="7" v-if="poslist && poslist.length>0" @click="change_pos" class="no_bottom_border border_color">
                <van-tab v-for="(p,index) in poslist" :key="index" :title="p.name">
                <div slot="title">
                    <img v-if="num_active==index" src="../../assets/an.png" alt="" style="position:absolute;width:0.5rem;left:50%;bottom:0;margin-left:-0.25rem;">
                    <span style="padding-bottom:6px;">{{p.name}}</span>
                </div>
                </van-tab>
            </van-tabs>
            <!-- <van-row class="text_center btn_group" style="padding-bottom:0.2rem;">
                <van-col span="6" v-for="(y,index) in ycplaytypes" :key="index">
                <van-button :type="index==yc_active?'danger':'default'" size="small" @click="change_yc(index)">{{y.ycplayname}}</van-button>
                </van-col>
            </van-row> -->
            <div class="flex fangan_box" v-if="ycplaytypes.length>0">
                <div v-for="(item,k) in ycplaytypes" :key="k" @click="change_yc(k)">
                <van-button :class="{mian_bgcolor:yc_active==k}" type="default" size="large">{{item.ycplayname}}</van-button>
                </div>
            </div>
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <div>
            <div v-for="(item,index) in list" :key="index">
                <div  class="flex list_item">
                    <div class="">
                        <img class="img_box" src="http://sscby.cn/zzh/defaulticon.png" alt="">
                    </div>
                    <div class="flex_grow_1">
                        <div style="font-size:.45rem">用户名</div>
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
            tabs_active:0,
            num_active:0,
            yc_active:0,
            poslist:[
                {
                    name: "红球杀码",
                    type: 101,
                    ycplaytypes:[
                        {ycplaytype: 103, ycplayname: "杀三码"},
                        {ycplaytype: 106, ycplayname: "杀六码"},
                        {ycplaytype: 110, ycplayname: "杀十码"}
                    ]
                },
                {
                    name: "球杀码",
                    type: 102,
                    ycplaytypes:[
                        {ycplaytype: 106, ycplayname: "杀六码"},
                        {ycplaytype: 110, ycplayname: "杀十码"}
                    ]
                },
            ],
            ycplaytypes:[
                {ycplaytype: 103, ycplayname: "杀三码"},
                {ycplaytype: 106, ycplayname: "杀六码"},
                {ycplaytype: 110, ycplayname: "杀十码"},
                {ycplaytype: 104, ycplayname: "杀三码"},
                {ycplaytype: 107, ycplayname: "杀六码"},
                {ycplaytype: 118, ycplayname: "杀十码"}
            ],
            list:[
                {},{},{}
            ]
        }
    },
    methods:{
        change_pos(index){
            this.num_active = index;
            this.yc_active = 0;
        },
        change_yc(index){
            this.yc_active = index;
        },
    }
        
}
</script>

<style lang="stylus" scoped>
.list_item
    padding .2rem 0
    .img_box
        width 1.6rem
        height 1.6rem
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

