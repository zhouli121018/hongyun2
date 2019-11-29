<template>
    <div class="">
        <title-bar title_name="走势图" />
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="trendtype" :options="trendtypes" @change="change_trendtype" />
                <van-dropdown-item v-model="option_value2" :options="issues" @change="change_issue" />
                <van-dropdown-item class="lottype_sel" v-model="option_value" :options="lottype" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <div style="padding:.55rem;" v-for="(item,index) in list" :key="index">
            <div style="font-size:.29rem;color:#333333;padding-bottom:.23rem;">{{item.posname}}</div>
            <div style="width:100%;overflow:auto;">
                <table class="table" border="1">
                    <tr v-for="(s,i) in item.erweiarray" :key="i">
                        <td  v-for="(c,ci) in s" :key="ci"><span :class="{spec:c==0}">{{c?c:s[0]}}</span></td>
                    </tr>
                </table>
            </div>
            
        </div>
        <div  style="padding:.55rem;">
            <div style="width:100%;overflow:auto;">
                <table class="table" border="0">
                    <tr>
                        <td v-for="(c,ci) in issues_list" :key="ci">{{c}}</td>
                    </tr>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import {gettrenddata } from '@/api/home'
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
            trendtype:'',
            trendtypes:[],
            issues_list:[],
        }
    },
    methods:{
        async gettrenddata () {
            let obj = {};
            obj.lottype = this.option_value
            obj.issuenum = this.option_value2
            obj.trendtype = this.trendtype
            const { data }    = await gettrenddata(obj);
            this.list = data.list;
            this.issues_list = data.issues;
        },
        change_lottype(val){
            this.gettrenddata();

        },
        change_issue(val){
            console.log(val)
            this.gettrenddata();
        },
        change_trendtype(val){
             console.log(val)
             this.gettrenddata();
        }
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
                        text:'第 '+item+' 期'
                    })
                })
                this.option_value2 = this.issues[0].value
                this.trendtypes = this.$store.getters.homeData.trendtypes;
                this.trendtypes.map(item=>{
                    item.value = item.id
                    item.text = item.name
                })
                this.trendtype = this.trendtypes[0].value
                this.gettrenddata();
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
                    text:'第 '+item+' 期'
                })
            })
            this.option_value2 = this.issues[0].value

            this.trendtypes = this.$store.getters.homeData.trendtypes;
            this.trendtypes.map(item=>{
                item.value = item.id
                item.text = item.name
            })
            this.trendtype = this.trendtypes[0].value
            this.gettrenddata();
        }
    },
    
} 
</script>

<style scoped lang="stylus">
/deep/ .title_box .van-ellipsis.van-nav-bar__title
    display none
/deep/ .van-dropdown-menu__item:nth-child(1)
    flex: unset;
    width 2.6rem
/deep/ .van-dropdown-menu__item:nth-child(2)
    margin-left .2rem
    margin-right .2rem
/deep/ .van-dropdown-menu__item:nth-child(3)
    flex: unset;
    width 2rem
.table
    width 100%
    max-width 100%
    border 1px solid #aaa
    td
        padding:.2rem
        border-right:1px solid #aaa;
        border-bottom:1px solid #aaa;
        text-align:center;
        font-size:.24rem;
        color:#333333;
        &:first-child
            background #F0F0FC;
        span.spec
            background:#87AC55;
            color:#fff;
            border-radius:50%;
            display:inline-block;
            width:.45rem;
            height:.45rem;
            line-height:.43rem;
.message_box
    border-bottom 1px solid #cccccc
// 右上角下拉菜单样式 start
.right_button /deep/ .van-dropdown-menu
    background none
/deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border none
.right_button
    width: 7.2rem;
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
