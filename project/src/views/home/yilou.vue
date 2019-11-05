<template>
    <div class="">
        <title-bar title_name="遗漏" />
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
                <van-dropdown-item v-model="option_value2" :options="issues[this.option_value]" @change="change_issue" />
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
        
    </div>
</template>

<script>
import {getlotmap } from '@/api/home'
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
        }
    },
    methods:{
        async getlotmap () {
            let obj = {};
            obj.lottype = this.option_value
            obj.issue = this.option_value2
            const { data }    = await getlotmap(obj);
            this.list = data.list;
        },
        change_lottype(val){
            this.option_value2 = this.issues[this.option_value][0].value
            this.getlotmap();

        },
        change_issue(val){
            console.log(val)
            this.getlotmap();
        },
    },
    created(){
        if(this.$store.getters.homeData == null){
            gethome_global().then(()=>{
                this.lottype = this.$store.getters.homeData.lottype
                let issues = this.$store.getters.homeData.issues
                this.lottype.map(item=>{
                    item.value = item.lottype
                    item.text = item.lotname
                })
                this.option_value = this.lottype[0].value
            
                for(let key in issues){
                    this.issues[key] = []
                    issues[key].map(item=>{
                        this.issues[key].push({
                            value:item,
                            text:'第 '+item+' 期'
                        })
                    })
                }
                this.option_value2 = this.issues[this.option_value][0].value
                this.getlotmap();
            })
        }else{
            this.lottype = this.$store.getters.homeData.lottype
            let issues = this.$store.getters.homeData.issues
            this.lottype.map(item=>{
                item.value = item.lottype
                item.text = item.lotname
            })
            this.option_value = this.lottype[0].value
            for(let key in issues){
                this.issues[key] = [];
                issues[key].map(item=>{
                    this.issues[key].push({
                        value:item,
                        text:'第 '+item+' 期'
                    })
                })
            }
            this.option_value2 = this.issues[this.option_value][0].value
            this.getlotmap();
        }
        console.log(this.lottype)
        console.log(this.issues)
    },
    
} 
</script>

<style scoped lang="stylus">
/deep/ .title_box .van-ellipsis.van-nav-bar__title
    display none
/deep/ .van-dropdown-menu__item:first-child
    margin-right .2rem
    flex: unset;
    width 2rem
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
.right_button /deep/ .van-dropdown-menu
    background none
/deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border none
/deep/ .van-dropdown-item.van-dropdown-item--down
    top 50px !important
.right_button
    width: 5.2rem;
    position: absolute;
    top: 10px;
    right: 8px;
    z-index: 1000;
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
