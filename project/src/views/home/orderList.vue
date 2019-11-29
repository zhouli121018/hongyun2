<template>
    <div>
        <title-bar title_name="订单列表"/>
        <div class="order_box" v-for="(item,index) in list" :key="index">
            <van-cell :value="item.createtime" />
            <div class="list_div">
                <img :src="item.pic" alt="">
                <span>{{item.pname}}</span>
            </div>
            <div class="list_div">
                <span>数量: {{item.num}}</span>
                <span>金额: ¥{{item.sumfee}}</span>
                <span>状态: <span class="pink">{{item.status}}</span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { getbuyproduct } from '@/api'
export default {
    data() {
        return {
            list: null
        }
    },
    methods: {
        async getbuyproduct() {
            const { data } = await getbuyproduct({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid')
            })
            this.list = data.list
        }
    },
    created() {
        this.getbuyproduct()
    }
}
</script>

<style scoped lang="stylus">
.order_box
    width 100%
    border-bottom 10px solid #f5f5f5
    padding .2rem .25rem
    box-sizing border-box
    .list_div 
        display flex
        padding .34rem 0
        img 
            width 1.8rem
            height 1.8rem
            margin-right .3rem
        &:last-child
            justify-content space-between
            span 
                line-height .6rem
.van-cell
    border-bottom 1px solid #e3e3e3
</style>
