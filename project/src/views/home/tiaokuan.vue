<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import {gettiaokuan } from '@/api/home'
export default {
    data(){
        return {
            title_name: '发表条款',
            title:'',
            content:''
        }
    },
    methods:{
        async gettiaokuan() {
            let obj = {
                type: 0  //0发布帖子条款，1发布预测条款
            }
            const { data } = await gettiaokuan(obj);
            if(data.errorcode == 0 && data.content){
                this.content = data.content;
            }
        },
    },
    created(){
        this.gettiaokuan();
    }
}
</script>

<style>

</style>
