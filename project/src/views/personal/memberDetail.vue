<template>
    <div>
        <title-bar title_name="会员码明细"/>
        <div class="member_box">
            <div>
                <span>会员码</span>
                <span>使用时间</span>
                <span>使用人</span>
            </div>
            <div v-for="(item,i) in list" :key="i">
                <span>{{item.vipcode}}</span>
                <span>{{item.usedtime}}</span>
                <span>{{item.username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getvipcodelist } from '@/api'
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getvipcodelist() {
            const { data } = await getvipcodelist({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid')
            })
            this.list = data.list
        }
    },
    mounted() {
        this.getvipcodelist()
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
        &:first-child
            background #f5f5f5
            span 
                font-size 14px
</style>
