<template>
    <div>
        <title-bar title_name="收入明细"/>
        <div class="member_box">
            <div>
                <span>日期</span>
                <span>金额</span>
                <span>类型</span>
            </div>
            <div v-for="(item,index) in list" :key="index">
                <span>{{item.money}}</span>
                <span>{{item.createtime}}</span>
                <span>{{item.type}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getmyincome } from '@/api'
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getmyincome() {
            const { data } = await getmyincome({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
            })
            this.list = data.list
        }
    },
    mounted() {
        this.getmyincome()
    }
}
</script>

<style scoped lang="stylus">
.member_box
    div
        display flex
        justify-content space-around
        align-items center
        width 100%
        height 1.2rem
        border-bottom 1px solid #eee
        span    
            font-size 13px
            text-align center
            &:first-child
                width 30%
            &:nth-child(2)
                width 40%  
            &:last-child
                width 20%  
        &:first-child
            background #f5f5f5
            span 
                font-size 14px
</style>
