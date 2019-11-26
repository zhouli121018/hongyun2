<template>
    <div>
        <title-bar title_name="历史过滤条件"/>
        <div class="member_box">
            <div v-for="(item,index) in list" :key="index">
                <span>{{item.name}}</span>
                <van-button @click="modifyClick(item.filtid)" style="height:1rem;line-height:1rem;padding:0 .1rem;border:1px solid #87AC55;border-radius:.2rem;color:#87AC55;">备注过滤名称</van-button>
                <van-button @click="tofilter(item.filtid)" style="height:1rem;line-height:1rem;padding:0 .1rem;border:1px solid #87AC55;border-radius:.2rem;color:#87AC55;">导入</van-button>
            </div>
        </div>
        <van-dialog 
            v-model="show_tt"
            title="修改名称"
            show-cancel-button
            class="dialog_content_input"
            :before-close="beforeClose"
            >
            <van-field
                v-model.trim="name"
                clearable
                label="名称："
            />
        </van-dialog>
        <div style="color:#a4d068;text-align:center;padding:.4rem 0;" v-if="lastid>0" @click="getfiltlist_my"> 加载更多</div>
    </div>
</template>

<script>
import { getfiltlist_my, modify_filtname } from '@/api'
export default {
    data() {
        return {
            lastid: 0,
            lottype: '',
            list: [],
            name: '',
            show_tt: false,
            filtid: ''
        }
    },
    methods: {
        // 去过滤页面
        tofilter(id) {
            this.$router.replace(`/home/filter?filtid=${id}`)
        },
        //点击
        modifyClick(filtid) {
            this.filtid = filtid
            this.show_tt = true
        },
        //列表
        async getfiltlist_my() {
            const { data } = await getfiltlist_my({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                lottype: this.lottype,
                lastid: this.lastid
            })
            if(this.lastid > 0) {
                this.list = this.list.concat(data.list)
            }else {
                this.list = data.list
            }
            this.lastid = data.lastid
        },
        //点击确定修改名称
        beforeClose(action,done){
            if(action == 'confirm'){
                if(!this.name){
                    this.$toast('请输入名称！')
                    done(false)
                    return;
                }
                this.modify_filtname();
                this.name = ''
            }
            done();
        },
        //修改名称
        async modify_filtname() {
            const { data } = await modify_filtname({
                uid: localStorage.getItem('huid'),
                sid: localStorage.getItem('hsid'),
                name: this.name,
                filtid: this.filtid
            })
            if(data.errorcode == 0) {
                this.lastid = 0
                this.getfiltlist_my()
            }
        }
    },
    activated() {
        if(this.$route.query.lottype) {
            this.lottype = this.$route.query.lottype
            this.getfiltlist_my()
        }
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
        height 1.5rem
        border-bottom 1px solid #eee
        span    
            font-size 13px
            text-align center
            width 45%
</style>
