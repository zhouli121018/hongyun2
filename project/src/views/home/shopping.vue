<template>
    <div>
        <title-bar title_name="商城" right_text="订单列表" right_url="/home/orderList"/>
        <div class="shopping_box">
            <router-link  v-for="(item,index) in list" :key="index" class="shopping_list" :to="{name: 'shoppingDetail',query:{pid: item.id}}">
                <img :src="$https+item.pic" alt="">
                <div>{{item.name}}</div>
                <div>
                    <span style="font-size:13px">{{item.buynum}}人购买</span>
                    <span class="pink">¥{{item.price}}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { getproductlist } from '@/api'
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getproductlist() {
            const { data } = await getproductlist({
                sid: localStorage.getItem('hsid'),
                uid: localStorage.getItem('huid')
            })
            this.list = data.list
        }
    },
    mounted() {
        this.getproductlist()
    }
}
</script>

<style lang="stylus" scoped>
.shopping_box
    width 100%
    padding .2rem
    box-sizing border-box
    display flex
    flex-wrap wrap
    justify-content space-around
.shopping_list
    width 45%
    text-align center
    border-bottom 1px solid #eee
    padding-bottom .2rem
    margin-top .3rem
    div
        display flex
        align-items center
        justify-content space-between
        line-height .8rem
    img 
        width 100%
        height 5.03rem
.pink
    font-size 12px
</style>

