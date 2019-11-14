<template>
    <div v-if="info != null">
        <title-bar title_name="卖会员码" right_text="会员码明细" right_url="/personal/memberDetail" />
        <div style="padding:.56rem 0 0;text-align:center;">
            <span class="line_border"></span>
            <span style="padding:0 .31rem;line-height:0.45rem;">说明</span>
            <span class="line_border"></span>
        </div>
        <div style="line-height:0.64rem;padding:.65rem .42rem .76rem;">
            <div style="font-size:0.37rem;">{{info.buydesc}}</div>
            
        </div>
        <div style="background:#F5F5F5;height:0.27rem;"></div>
        <div style="padding:.56rem 0 0;text-align:center;">
            <span class="line_border"></span>
            <span style="padding:0 .31rem;line-height:0.45rem;">购买方式</span>
            <span class="line_border"></span>
        </div>
        <div style="line-height:0.64rem;padding:.65rem 1.83rem .76rem;">
            <div style="font-size:0.37rem;" class="flex">
                <!-- <span class="flex_grow_1">添加微信：<span style="color:#FF0B60;">SNSN889922</span></span>
                
                <span>购买会员码</span> -->
                {{info.buytype}}
            </div>
            <!-- <div style="font-size:0.37rem;">购买的会员码不可以退还，也不能退款</div> -->
        </div>
    </div>
</template>

<script>
import { getbuyvipcodedesc } from '@/api'
export default {
    data(){
        return {
            info: null
        }
    },
    methods:{
        async getbuyvipcodedesc() {
            const { data } = await getbuyvipcodedesc({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid')
            })
            this.info = data
        }
    },
    mounted() {
        this.getbuyvipcodedesc()
    }
        
}
</script>

<style lang="stylus" scoped>
.line_border
    display:inline-block;
    width:2.52rem;
    height:1px; 
    background:#969696;
    vertical-align: middle;
</style>

