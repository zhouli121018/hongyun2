<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import { getrule } from '@/api'
export default {
    data(){
        return {
            title_name: '预测规则',
            title:'',
            content:''
        }
    },
    methods:{
        async getrule() {
            const { data } = await getrule();
            if(data.errorcode == 0 && data.content){
                this.content = data.content;
            }
        },
    },
    created(){
        this.getrule();
    }
}
</script>

<style>

</style>
