<template>
    <div v-if="info != null">
        <title-bar title_name="过滤"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <div class="fil_box">
            <span>过滤条件：</span>
            <!-- <select class="select" @change="indexSelect($event)">
                <option v-for="(t,i) in info.list" :key="i" :value="t.filttype">{{t.filtname}}</option>
            </select> -->
            <div class="filt_select" style="display:inline-block;border:1px solid #E3E3E3; padding: 0 .4rem 0 .2rem;margin-right:.3rem;border-radius:.12rem;">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" :options="info.list" @change="indexSelect"/>
                </van-dropdown-menu>
            </div>
            
            <img @click="addfilters()" src="~@/assets/plus.png" alt="" style="width:.6rem;">
        </div>
        <div style="color:#FF0B60;background:#F5F5F5;font-size:.32rem;padding:.27rem .56rem">
            {{info.title}}
        </div>
        <!-- 手动添加的数据 -->
        <div style="padding:0 .56rem;">
            <div v-for="(item,index) in defaltfilttypeList" :key="index" style="font-size:.373rem;color:#333333;border-bottom:2px solid #E3E3E3;line-height:.5rem;">
                <!-- <img @click="deletefilters(index)" src="~@/assets/min.png" alt="" style="width:.48rem;"> -->
                <!-- {{item.filtname}} -->
                <!-- <span style="width:.5rem;display:inline-block"></span> -->
                <!-- <input style="border-bottom:1px solid #eee;padding:.2rem" v-model="item.content" type="text" :placeholder="item.filthint"> -->
                <van-field  v-model="item.content"  clearable :label="item.filtname" :placeholder="item.filthint" style="padding-left:0;" :label-width="135">
                    <span slot="label"><img @click="deletefilters(index)" src="~@/assets/min.png" alt="" style="width:.48rem;"> {{item.filtname}}</span>
                </van-field>
            </div>
        </div>
        <div class="text_center" style="padding:.35rem 0;">
            <router-link class="bottom_size" :to="{name: 'historyFilter',query: {lottype: option_value}}">历史过滤条件</router-link>
            <van-button @click="filterContentClick()" style="width:4.03rem;height:1.21rem;background:#87AC55;border-radius:.2rem;color:#fff;font-size:0.53rem;line-height:0.8rem;">过滤</van-button>
        </div>
        <div style="background:#F5F5F5;height:0.27rem;"></div>
        <div style="padding:.4rem .56rem;" v-if="content != ''">
            <div style="padding-bottom:.27rem;">
                <span style="font-size:0.37rem;color:#333333">过滤结果</span> 
                <span @click="doCopy(content)" style="float:right;font-size:0.37rem;color:#FF0B60">复制</span>
            </div>
            <div style="font-size:0.29rem;color:#333333;line-height:0.6rem;text-align:justify">
                {{content}}
            </div>
        </div>
        
       
        
    </div>
</template>

<script>
import { getpredrank } from '@/api/home'
import {gethome_global} from '@/utils'
import { getfiltcondition, filt } from '@/api'
import { Dialog } from 'vant'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
    data(){
        return {
            option_value:'a',
            lottype:[],
            list: [],
            filtid: 0,
            info: null,
            filttypes: '',
            content: '',
            defaltfilttypeList: [],
            defaltfilttypeobj: null,
            value1:'',
        }
    },
    methods:{
        //选择下拉框
        indexSelect(filttype) {
            this.defaltfilttypeobj = this.info.list.filter(item => item.filttype == filttype)[0]
        },
        //点击添加过滤条件并且追加到info.defaltfilttype里面 显示在页面中间内容区域
        addfilters() {
            this.defaltfilttypeList.unshift({
                filttype:this.defaltfilttypeobj.filttype,
                filthint:this.defaltfilttypeobj.filthint,
                filtname:this.defaltfilttypeobj.filtname,
                content:''
                })
        },
        //删除中间区域内容
        deletefilters(e) {
            this.defaltfilttypeList = this.defaltfilttypeList.filter((item,i) => {
                if(e != i) {
                   return item
                }
            })
        },
        //点击过滤按钮
        filterContentClick() {
            this.filttypes = '';
            let ischeck = false;
            this.defaltfilttypeList.forEach(item=>{
                if(!item.content){
                    ischeck = true;
                    return;
                }
                this.filttypes += item.filttype+':'+item.content+';'
            })
            if(ischeck){
                this.$toast('请输入内容~')
                return;
            }
            this.filterContent();
        },
        doCopy (text) {
            this.$copyText(text).then(function (e) {
                Dialog.alert({
                    title: '提示',
                    message: '复制成功，请粘贴分享到微信或QQ。'
                }).then(() => {
                // on close
                });
            }, function (e) {
                Dialog.alert({
                    title: '提示',
                    message: '复制失败，请手动复制！'
                }).then(() => {
                // on close
                });
            })
        },
        //获取下拉框条件
        async getfiltcondition() {
            const { data } = await getfiltcondition({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                lottype: this.option_value,
                filtid: this.filtid
            })
            this.info = data
            this.info.list.forEach(val=>{
                val.value = val.filttype;
                val.text = val.filtname
            })
            this.value1 = this.info.list[0].value;
            this.filtid = this.info.filtid
            this.defaltfilttypeobj = this.info.list[0]
            this.defaltfilttypeList = [];
            this.info.defaltfilttype.forEach(val => {
                this.defaltfilttypeList.push({
                    filttype:val.filttype,
                    filthint:val.filthint,
                    filtname:val.filtname,
                    content:val.content
                })
            });
            //如果服务器defaltfilttype数组有返回值就用filttype去list里面相同的filttype查找相应的filtname值
            this.defaltfilttypeList = this.defaltfilttypeList.map(item => {
                for(let i = 0; i < this.info.list.length; i++) {
                    if(item.filttype == this.info.list[i].filttype) {
                        return {
                            ...item,
                            filtname: this.info.list[i].filtname
                        }
                    }
                }
            })
        },
        //获取过滤页面接口
        async filterContent() {
            const { data } = await filt({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                filttypes: this.filttypes.substring(0,this.filttypes.length-1),
                lottype: this.option_value,
                filtid: this.filtid
            })
            this.content = data.content
            this.filtid = data.filtid
        },
        //选择右上角条件
        change_lottype(val){
            this.getfiltcondition()
        },
    },
    created(){
        this.isFirstEnter=true;
        if(this.$route.query.filtid) {
            this.filtid = this.$route.query.filtid
        }
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
                    this.getfiltcondition()//获取过滤条件
                })
            }else{
                this.lottype = this.$store.getters.homeData.lottype
                this.lottype.map(item=>{
                    item.value = item.lottype
                    item.text = item.lotname
                })
                this.option_value = this.lottype[0].value
                this.getfiltcondition()//获取过滤条件
            }
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    }
        
}
</script>

<style lang="stylus" scoped>
/deep/ .filt_select .van-dropdown-menu
    height .92rem

.bottom_size
    padding-top .8rem
    font-size 12px
    padding-left .3rem
    color #26B5FF
    text-decoration:underline
.fil_box
    padding .12rem .56rem
.select
    background: #fff;
    border: 2px solid #E3E3E3;
    border-radius: .12rem;
    outline: none;
    width: 4.67rem;
    height: .92rem;
    text-align: center;
    padding: 0 .3rem;
// 右上角下拉菜单样式 start
/deep/ .right_button .van-dropdown-item.van-dropdown-item--down
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

