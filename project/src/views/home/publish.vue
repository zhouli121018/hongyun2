<template>
    <div>
        <title-bar title_name="发表"/>
        <div style="width:2.4rem;padding:.69rem 0 .5rem .54rem;">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="option" @change="change" />
            </van-dropdown-menu>
        </div>
        <div class="address">
            <img src="~@/assets/dingwei.png" alt=""> 地址：*****
        </div>
        <div class="area">
            <div class="box"></div>
        </div>
        <div class="btn_box">
            <van-button size="normal"> <img src="~@/assets/luyin.png" style="width:.32rem" /> 长按录音</van-button>
        </div>
        <div class="upload_box">
            <van-uploader :after-read="afterRead" />
        </div>
        <div class="bottom_btn_box">
            <van-button >提交</van-button>
            <span class="pub">发表条款</span>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {},{}
            ],
            option_value:'a',
            option: [
                { text: '讨论区', value: 'a' },
                { text: '七星彩1', value: 'b' },
                { text: '七星彩2', value: 'c' },
            ],
        }
    },
    methods:{
        change(val){
            this.$toast(val)
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        }
    }
        
}
</script>

<style lang="stylus" scoped>
/deep/ .van-dropdown-menu  
        background #87AC55
        height 26px
        border-radius 5px
        .van-dropdown-menu__title 
            color #fff
            .van-ellipsis
                font-size .37rem

.address
    color #666666
    padding-left:.54rem
    font-size .4rem
    img 
        width .3rem
.area
    padding:0.32rem .54rem
    .box
        border 1px solid #A5A5A5
        height 3.9rem
        width 8.9rem
.btn_box
    padding:0.22rem .54rem 0
    button 
        background #EDEDED
        color #A5A5A5
        font-size .4rem
        width 3.37rem
        height 1rem
        border-radius .1rem
        line-height .8rem
.upload_box
    padding:0.75rem .54rem 0
    /deep/ .van-uploader__upload
        background-color #EDEDED
.bottom_btn_box
    padding:1.32rem  0 0
    button 
        margin-left 2.96rem
        background #87AC55
        color #ffffff
        font-weight bold
        font-size .53rem
        width 4rem
        height 1.2rem
        line-height: 1rem;
        margin-right .6rem
    .pub
        color #00A8FF
        border-bottom 1px solid #00a8ff
        vertical-align: sub;
        font-size .35rem
</style>

