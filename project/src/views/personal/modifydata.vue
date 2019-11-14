<template>
    <div>
        <title-bar title_name="修改资料"/>
        <div style="text-align:center">
            <img :src="icon" alt="">
        </div>
        <div class="modifydata_list">
            <p>昵称</p>
            <van-field v-model="uname" />
        </div>
        <div class="modifydata_list">
            <p style="padding-bottom:.4rem">简介</p>
            <van-field style="border:1px solid #e3e3e3" v-model="jianjie" type="textarea"/>
        </div>
        <div class="shopping_bottom">
            <van-button size="normal" @click="modifyUserinfor" style="background:#87AC55;color:#fff;padding:0 35px">确认修改</van-button>
        </div>
    </div>
</template>

<script>
import { modifyUserinfor } from '@/api'
export default {
    data() {
        return {
            icon: '',
            uname: '',
            jianjie: ''
        }
    },
    methods: {
        async modifyUserinfor() {
            if(!this.icon || !this.username || !this.jianjie) {
                this.$toast('资料不能为空!')
                return
            }
            const { data } = await modifyUserinfor({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                icon: this.icon,
                username: this.uname,
                jianjie: this.jianjie
            })
        }
    }
}
</script>

<style scoped lang="stylus">
.shopping_bottom
    text-align:center
    margin-top 1rem
img 
    width 3rem
    height 3rem
    background #eeeeee
    border-radius 50%
    margin .8rem 0
.modifydata_list
    width 94%
    margin .4rem auto
.van-cell
    border-bottom 1px solid #e3e3e3
    padding: .15rem 0;
</style>
