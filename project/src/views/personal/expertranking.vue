<template>
    <div>
        <title-bar title_name="专家排名奖励" right_text="参与规则" right_url="/personal/participaterules"/>
        <div class="expertranking_box">
            <van-cell v-for="(l,index) in list" :key="index" :title="l.createtime" size="large" :label="l.content" />
        </div>
    </div>
</template>

<script>
import {getrankaward_exp} from '@/api/home'
export default {
    data (){
        return {
            list:[],
            isFirstEnter:false,
        }
    },
    methods:{
        async getrankaward_exp () {
            let obj = {};
            const { data }    = await getrankaward_exp(obj);
            this.list = data.list;
        },
    },
    created(){
        this.isFirstEnter = true
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getrankaward_exp();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    }
}
</script>

<style scoped lang="stylus">
/deep/ .van-cell::after
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-bottom: 2px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
.van-cell__label
    color #333
    font-size .42rem
</style>
