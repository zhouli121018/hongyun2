<template>
    <div class="">
        <title-bar title_name="奖表" />
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <div style="padding:.2rem;">
            <table class="table" border="1">
                <tr v-for="(s,index) in list" :key="index">
                    <td>{{s.kjissue}}</td>
                    <td>{{s.sum}}</td>
                    <td v-for="(n,i) in s.kjnum.split(',')" :key="i">{{n}}</td>

                </tr>
            </table>
        </div>
        <div v-if="barcode" style="text-align:right;">
            <img :src="this.$https_img+'/'+barcode" alt="" style="width:2.13rem;height:2.13rem;margin:.4rem .96rem .36rem 0;">
            <div style="text-align:right;padding-right:.47rem;font-size:0.35rem;line-height:0.4rem;padding-bottom:.4rem;">奖表由鸿运四码提供</div>
        </div>
        
    </div>
</template>

<script>
import {getlottable } from '@/api/home'
import {gethome_global } from '@/utils'
export default {
    data (){
        return {
            list:[],
            isFirstEnter:false,
            lottype:[],
            lt_active:0,
            option_value:'',
            barcode:''
        }
    },
    methods:{
        async getlottable () {
            let obj = {};
            obj.lottype = this.option_value
            const { data }    = await getlottable(obj);
            this.list = data.list;
            this.barcode = data.barcode;
        },
        change_lottype(){
            this.getlottable();
        },
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
                this.getlottable();
            })
        }else{
            this.lottype = this.$store.getters.homeData.lottype
            this.lottype.map(item=>{
                item.value = item.lottype
                item.text = item.lotname
            })
            this.option_value = this.lottype[0].value
            this.getlottable();
        }
        console.log(this.lottype)
    },
    
} 
</script>

<style scoped lang="stylus">
.table
    width 100%
    border 1px solid #aaa
    td
        padding:.2rem
        border-right:1px solid #aaa;
        border-bottom:1px solid #aaa;
.message_box
    border-bottom 1px solid #cccccc
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
</style>
