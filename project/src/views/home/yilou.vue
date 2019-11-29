<template>
    <div class="">
        <title-bar title_name="遗漏" />
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
                <van-dropdown-item v-model="option_value2" :options="issues" @change="change_issue" />
            </van-dropdown-menu>
        </div>
        <div style="padding:0 .4rem;" v-for="(item,index) in list" :key="index">
            <div class="title_yilou">{{item.posname}}</div>
            <div style="width:100%;overflow:auto;">
                <table class="table" border="1">
                    <tr>
                        <th v-for="(h,i) in tablehead" :key="i">{{h}}</th>
                    </tr>
                    <tr v-for="(s,k) in item.erweiarray" :key="k">
                        <td v-for="(n,j) in s" :key="j" :class="{has_color:k%2==1}">{{n}}</td>
                    </tr>
                </table>
            </div>
            
        </div>
        <div style="height:.2rem "></div>
        <div style="padding:.2rem .4rem;line-height:0.5rem;font-size:0.35rem;" v-html="shuoming"></div>
        
    </div>
</template>

<script>
import {getyiloudata } from '@/api/home'
import {gethome_global } from '@/utils'
export default {
    data (){
        return {
            list:[],
            isFirstEnter:false,
            lottype:[],
            lt_active:0,
            option_value:'',
            issues:[],
            is_active:0,
            option_value2:'',
            tablehead:[],
            shuoming:''
        }
    },
    methods:{
        async getyiloudata () {
            let obj = {};
            obj.lottype = this.option_value
            obj.issue = this.option_value2
            const { data }    = await getyiloudata(obj);
            this.list = data.list;
            this.shuoming = data.shuoming;
            this.tablehead = data.tablehead;
        },
        change_lottype(val){
            this.getyiloudata();

        },
        change_issue(val){
            console.log(val)
            this.getyiloudata();
        },
    },
    created(){
        if(this.$store.getters.homeData == null){
            gethome_global().then(()=>{
                this.lottype = this.$store.getters.homeData.lottype
                let issues = this.$store.getters.homeData.trendissues
                this.lottype.map(item=>{
                    item.value = item.lottype
                    item.text = item.lotname
                })
                this.option_value = this.lottype[0].value
            
                this.issues = [];
                issues.map(item=>{
                    this.issues.push({
                        value:item,
                        text:'近 '+item+' 期'
                    })
                })
                this.option_value2 = this.issues[0].value
                this.getyiloudata();
            })
        }else{
            this.lottype = this.$store.getters.homeData.lottype
            let issues = this.$store.getters.homeData.trendissues
            this.lottype.map(item=>{
                item.value = item.lottype
                item.text = item.lotname
            })
            this.option_value = this.lottype[0].value
            this.issues = [];
            issues.map(item=>{
                this.issues.push({
                    value:item,
                    text:'近 '+item+' 期'
                })
            })
            this.option_value2 = this.issues[0].value
            this.getyiloudata();
        }
        console.log(this.lottype)
        console.log(this.issues)
    },
    
} 
</script>

<style scoped lang="stylus">
.table
    td.has_color
        color #9C9091
        background #F1F1FE
.title_yilou
    font-size .37rem
    color #333333
    padding .3rem 0 .24rem
/deep/ .title_box .van-ellipsis.van-nav-bar__title
    display none
/deep/ .van-dropdown-menu__item:first-child
    margin-right .2rem
    flex: unset;
    width 2rem
.table
    max-width 100%
    border 1px solid #CCCCCC
    td,th
        padding:.2rem
        border-right:1px solid #CCCCCC;
        border-bottom:1px solid #CCCCCC;
        white-space nowrap
    td
        font-size .35rem
        color #373737
    th 
        background #F5E3C8
        font-size .37rem
.message_box
    border-bottom 1px solid #cccccc
// 右上角下拉菜单样式 start
.right_button /deep/ .van-dropdown-menu
    background none
/deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border none
.right_button
    width: 4.6rem;
    position: absolute;
    top: 10px;
    right: 8px;
    /deep/ .van-dropdown-menu 
        height 26px
        border-radius 5px
        .van-dropdown-menu__title 
            color #fff
            .van-ellipsis
                font-size .32rem
        .van-dropdown-menu__item
            background #A4D068
            border-radius .12rem
// 右上角下拉菜单样式 end  
</style>
