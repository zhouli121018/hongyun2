<template>
    <div class="">
        <title-bar title_name="公告" />
        <div class="message_box ellipsis_box" v-for="(l,index) in list" :key="index">
            <van-cell :title="l.title" is-link :value="l.date" @click="goDetail(l)"/>
        </div>
    </div>
</template>

<script>
import {getnotices } from '@/api/home'
export default {
    data (){
        return {
            list:[],
            isFirstEnter:false
        }
    },
    methods:{
        async getnotices () {
          const { data }    = await getnotices();
          this.list = data.list;
        },
        goDetail(data){
            this.$router.push({
                path: '/home/announcement/detail', 
                query: {
                    // title: data.title, 
                    noticeid: data.id
                }
            })
        }
    },
    created(){
        this.isFirstEnter=true;
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == 'announcementDetail') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; 
      }
      next()
    },
    activated(){
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getnotices()
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
} 
</script>

<style scoped lang="stylus">
.message_box
    border-bottom 1px solid #cccccc
    
</style>
