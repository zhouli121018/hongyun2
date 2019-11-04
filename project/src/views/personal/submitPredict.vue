<template>
    <div>
        <title-bar title_name="提交预测"/>
        <div class="right_button">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="option" @change="change_lottype" />
            </van-dropdown-menu>
        </div>
        <h3>1七星彩999期预测</h3>
        <div class="predict_list">
            <div class="line_first"><span class="line"></span>第一位</div>
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
        </div>
        <div class="predict_list">
            <div class="line_first"><span class="line"></span>第一位</div>
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
            <van-cell title="杀3码: " value="内容" />
        </div>
        <div class="shopping_bottom">
            <van-button style="background:#87AC55;color:#fff">提交</van-button>
            <router-link class="bottom_size" to="">预测规则</router-link>
        </div>
    </div>
</template>

<script>
import { submitPred } from '@/api'
export default {
    data() {
        return {
            option_value:'a',
            option: [
                { text: '七星彩', value: 'a' },
                { text: '七星彩1', value: 'b' },
                { text: '七星彩2', value: 'c' },
            ],
            tabs_active:0,
        }
    },
    methods: {
        change_lottype(val){
            this.$toast(val)
        },
        async submitPred() {
            const { data } = await submitPred({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                lottype: ''
            })
            console.log(data)
        }
    },
    mounted() {
        this.submitPred()
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
        width 35%
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
