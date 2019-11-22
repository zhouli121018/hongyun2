<template>
    <div>
        <title-bar title_name="梦兆"/>
        <div class="search_box">
            <input v-model="keyword" placeholder="请输入号码或梦境关键词" />
            <img src="../../assets/sreach_img.png" alt="" @click="onSearch">
        </div>
        <div class="dreams_list" v-for="(item,index) in list" :key="index">
            <img :src="$https_img+'/'+item.pic" alt="">
            <div>
                <p>{{item.title}}</p>
                <p>
                    <span>{{item.num1}}</span>
                    <span>{{item.num2}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {getmengzhaolist } from '@/api/home'
export default {
    data() {
        return {
            keyword: '',
            list:[]
        }
    },
    methods: {
        onSearch() {
            this.getmengzhaolist();
        },
        async getmengzhaolist (){
            let obj = {};
            if(this.keyword){
                obj.keyword = this.keyword;
            }
            const {data} = await getmengzhaolist(obj);
            this.list = data.list;
            
        }
    },
    created(){
        this.getmengzhaolist();
    }
}
</script>

<style scoped lang="stylus">
.dreams_list
    width 94%
    padding .2rem 
    box-sizing border-box 
    display flex
    align-items center
    margin-top .6rem
    img 
        width 2.56rem
        height 3.5rem
        margin-right .4rem
        background #333
    p 
        height 1.8rem
        line-height 1.8rem
        &:first-child
            font-size 18px
        span 
            padding-right .6rem
.search_box
    width 90%
    height 1.2rem
    margin .2rem auto
    background #EDEDED
    border-radius .5rem
    display flex
    justify-content space-between
    align-items center
    padding 0 .4rem
    box-sizing border-box
    input 
        width 90%
    img 
        width .52rem
        height .52rem
    
</style>
