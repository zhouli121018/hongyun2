<template>
    <div>
        <title-bar title_name="提交预测"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="lottype" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <h3>{{title}}</h3>
        <div class="predict_list" v-for="(item,index) in list" :key="index">
            <div class="line_first"><span class="line"></span>{{item.posname}}</div>
            <van-cell v-for="(dom,i) in item.playtypes" :key="i" :title="dom.playname" :value="dom.playhint" />
        </div>
        <div class="shopping_bottom">
            <van-button style="background:#87AC55;color:#fff" @click="submitPred">提交</van-button>
            <router-link class="bottom_size" to="">预测规则</router-link>
        </div>
    </div>
</template>

<script>
import { submitPred, getpredcondition } from '@/api'
import { getlottable } from '@/api/home'
import {gethome_global } from '@/utils'
export default {
    data() {
        return {
            option_value:'a',
            lottype: [],
            tabs_active:0,
            option_value: '',
            list: [],
            title: ''
        }
    },
    methods: {
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
        async getpredcondition() {
            const { data } = await getpredcondition({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                lottype: this.option_value
            })
            this.list = data.list
            this.title = data.title
            console.log(data)
        },
        async submitPred() {
            const { data } = await submitPred({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                lottype: this.option_value,
                content: ''
            })
            console.log(data)
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
                this.getpredcondition()
            })
        }else{
            this.lottype = this.$store.getters.homeData.lottype
            this.lottype.map(item=>{
                item.value = item.lottype
                item.text = item.lotname
            })
            this.option_value = this.lottype[0].value
            this.getpredcondition()
        }
        console.log(this.lottype)
    },
    mounted() {
        
    }
}
</script>

<style lang="stylus" scoped>
.shopping_bottom
    width 100%
    padding .5rem 0
    display flex
    justify-content center
    align-items bottom
    .van-button
        width 3.8rem
    .bottom_size
        padding-top .8rem
        font-size 12px
        padding-left .3rem
        color #26B5FF
        text-decoration:underline
h3 
    width 100%
    text-align center
    padding .2rem 0
.predict_list
    padding .3rem
    box-sizing border-box
    border-bottom 10px solid #f5f5f5
    .line_first
        display flex
        align-items center
        font-size 12px
        .line
            width 4px
            height 14px
            background #87AC55
            display inline-block
            margin-right .2rem
            
    .van-cell
        border-bottom 1px solid #e3e3e3
    .van-cell__title
        width 32%
        flex none
    .van-cell__value
        text-align left 
    .van-cell__title, .van-cell__value
        font-size 12px
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
// 右上角下拉菜单样式 end
</style>
