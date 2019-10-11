<template>
    <div>
        <title-bar title_name="搜索"/>
        <div class="">
            <van-search
                v-model="value"
                placeholder="请输入用户名"
                show-action
                shape="round"
                @search="onSearch"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <div style="padding:0 0 10px 16px;">热搜专家: *** *** ***</div>
           
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
            list:[
                {},{},{}
            ],
            value:''
        }
    },
    methods:{
        onSearch(){}
    }
        
}
</script>

<style lang="stylus" scoped>
/deep/ .van-search__content
    background #EDEDED
.list_item
    padding .2rem 0
    .img_box
        width 1.6rem
        height 1.6rem

</style>

