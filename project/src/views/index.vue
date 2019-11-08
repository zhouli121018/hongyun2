<template>
    <div class="container" :class="{has_bottom:$route.meta.has_bottom}">
        
            <div class="scroll">
                <!-- <transition name='slide-fade' mode="out-in"> -->
                    <keep-alive>
                        <router-view v-if="$route.meta.cache"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.cache"></router-view>
                <!-- </transition> -->
            </div>
        
        <tabbar v-model="active" active-color="#87AC55" v-if="$route.meta.has_bottom" style="height:58px;background:#f7f7f7;">
            <tabbar-item :to="{name: 'home'}">
                <img slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.normal" alt=""> 
                首页
            </tabbar-item>
            <tabbar-item :to="{name: 'bangdan'}">
                <img slot="icon"
                    slot-scope="props"
                    :src="props.active ? boyOrgirl.active : boyOrgirl.normal" alt=""> 
                榜单</tabbar-item>
            <tabbar-item :to="{name: 'caiyouquan'}" icon="gender">
                <img slot="icon" 
                    slot-scope="props"
                    :src="props.active ? gender.active : gender.normal" alt="">
                彩友圈</tabbar-item>
            <tabbar-item :to="{name: 'shopping'}" icon="recommended">
                <img slot="icon" 
                    slot-scope="props"
                    :src="props.active ? recommended.active : recommended.normal" alt="">
                商城</tabbar-item>
            <tabbar-item :to="{name: 'personalIndex'}" icon="personal">
                <img slot="icon"
                    slot-scope="props"
                    :src="props.active ? personal.active : personal.normal" alt="">
                我的</tabbar-item>
        </tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, Tab, Tabs } from "vant";
export default {
    data() {
        return {
            active: 0,
            icon: {
                normal: require("../assets/prosperity_normal.png"),
                active: require("../assets/prosperity_select.png"),
            },
            boyOrgirl: {
                normal: require("../assets/boygirls_normal.png"),
                active: require("../assets/boygirls_select.png"),
            },
            gender: {
                normal: require("../assets/gender_normal.png"),
                active: require("../assets/gender_select.png"),
            },
            recommended: {
                normal: require("../assets/recommended_normal.png"),
                active: require("../assets/recommended_select.png"),
            },
            personal: {
                normal: require("../assets/personal_normal.png"),
                active: require("../assets/personal_select.png"),
            }
        }
    },
    components: {
        Tabbar,
        TabbarItem,
        Tab,
        Tabs
    },
    watch:{
        $route(newval){
            if(newval.name == 'caiyouquan'){
                this.active = 2;
            }else if(newval.name == 'shopping'){
                this.active = 3;
            }else if(newval.name == 'personalIndex'){
                this.active = 4
            }else if(newval.name == 'bangdan' || newval.name == 'search'){
                this.active = 1
            }else if(newval.name == 'home'){
                this.active = 0
            }
        }
    },
    created(){
        let newval = this.$route;
        if(newval.name == 'caiyouquan'){
            this.active = 2;
        }else if(newval.name == 'shopping'){
            this.active = 3;
        }else if(newval.name == 'personalIndex'){
            this.active = 4
        }else if(newval.name == 'bangdan' || newval.name == 'search'){
            this.active = 1
        }else if(newval.name == 'home'){
            this.active = 0
        }
    }
}
</script>

<style lang="stylus" scoped>
.active_icon
    background:#FE91B7;
    color:#fff;
    border-radius:50%;
    padding: .08rem;
.scroll {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height:100%;
}
.has_bottom{
    padding-bottom:58px;
    box-sizing:border-box;
}
/deep/ .van-tabbar-item
    .van-tabbar-item__text
        font-size .38rem
.van-tabbar-item__icon img
    height .45rem
.van-tabbar-item--active .van-tabbar-item__icon img
    height .6rem
</style>
