<template>
  <div >
    <div id="home_page">
        <div class="fixed_title">
          <van-nav-bar
            title="鸿运四码"
            :left-text="left_text"
            right-text="关于"
            @click-left="onClickLeft"
          >
            <span slot="title">鸿运四码
            </span>
          </van-nav-bar>
        </div>
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <a :href="banner_url" v-show="false" id="banner_a">1</a>
        
        <van-row :gutter="30" class="list_box text_center" style="margin-right:0;margin-left:0;">
          <van-col span="6" style="width:23%;padding-left:0;padding-right:0" v-for="(l,index) in list" :key="index">
            <div class="item_box"  @click="jumpTo(l.link,l.islink)">
              <img :src="l.src" alt="" class="max_width_100">
              <span>{{l.title}}</span>
            </div>
          </van-col>
        </van-row>
        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <!-- 公告 -->
        <div class="announcement_list">
          <div>
            <img src="../../assets/gonggao.png" alt="">
            <span class="gonggao">公告</span>
            <span class="gray">2019/12/12</span>
          </div>
          <div>
            <van-notice-bar
              color="#333"
              text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
            />
          </div>
        </div>
        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <!-- 列表栏 -->
        <div style="background:#F5F5F5;padding-bottom:.2rem;">
          <div class="announcement_list" v-for="(item,index) in imgList" :key="index">
            <div>
              <img :src="item.src" alt="" style="width:.6rem;height:.6rem">
              <span class="gonggao">{{item.txt}}</span>
              <span class="gray">2019/12/12</span>
            </div>
            <div>
              <p>七星彩 【1928】 ：887261</p>
              <p>排列五 【1928】 ：887261</p>
            </div>
          </div>
        </div>
        
    </div>

    <div class="container" v-if="is_ios" style="background:#F5F5F5;padding-top:0.4rem !important;position:absolute;top:0;z-index:1001;padding-bottom:2rem;">
        <!-- <title-bar title_name="添加到主屏幕" /> -->
        <div style="background:#EFEFEF;padding:0.2rem 0.15rem;margin:0 0.3rem 0.2rem;">
            <div style="text-align:center;font-size:0.5rem;color:#DB3030;font-weight:bold;padding:0.2rem 0;">温馨提示</div>
            <div style="line-height:1.6;padding-left:0.2rem;font-size:0.4rem;">
              请务必添加本页面到主屏幕，以便下次访问。
            </div>
            <div style="text-align:center;padding:0.4rem 0;">
              <van-button style="width:3rem;background-color:#D4D4D4;color:#1A1A1A;font-size:0.45rem;" @click="addfn">已添加</van-button>
              <van-button style="width:3rem;margin-left:1rem;background-color:#DB3030;color:#fff;font-size:0.45rem;" @click="ignore">关闭</van-button>
            </div>
        </div>
        <img src="../../assets/down_iphone.png" alt="" style="width:100%">
    </div>
    
  </div>
</template>

<script>
import { gethome } from '@/api/home'
export default {
  data () {
    return {
      list:[
        {src:require('../../assets/charts.png'),title:'走势图',link:'/personal/freeUse',islink: false},
        {src:require('../../assets/filter.png'),title:'过滤',link:'/home/filter',islink: false},
        {src:require('../../assets/missing.png'),title:'遗漏',link:'/home/announcement/index',islink: localStorage.getItem('uid')?false:true},
        {src:require('../../assets/dreams.png'),title:'梦兆',link:'/home/dreams',islink: localStorage.getItem('uid')?false:true}
        
      ],
      imgList: [
        {src:require('../../assets/speak _table.png'),txt:'奖表'},
        {src:require('../../assets/prize_figure.png'),txt:'奖图'},
        {src:require('../../assets/lucky_star.png'),txt:'幸运用户'},
        {src:require('../../assets/expert_ ranking.png'),txt:'专家排名奖励'}
      ],
      advs:[],
      left_text:'登录',
      left_path:'/login/index',
      banner_url:'#',
      is_ios:false,
      isFirstEnter:false,
    }
  },
  methods: {
    addfn(){
      this.is_ios = false;
    },
    ignore(){
      this.is_ios = false;
    },
    onClickLeft() {
      this.$router.push(this.left_path)
    },
    jumpTo( path, islink ){
      if(path.indexOf('/')==0){
        this.$router.push(path)
      }else{
        this.banner_url = path;
        this.$nextTick(()=>{
          document.getElementById('banner_a').click();
        })
      }
    },
    async gethome() {
      let obj = {};
      const { data } = await gethome(obj)
    },
  },
  created(){
    this.isFirstEnter=true;
    //判断 浏览器类型
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      
      if(window.navigator.standalone){
        this.is_ios = false;
      }else{
        this.is_ios = true;
      }
    }

    if(this.$route.query.cid){
      localStorage['cid'] = this.$route.query.cid;
    }else{
      localStorage['cid'] = ''
    }
    if(this.$route.query.pid){
      localStorage['pid'] = this.$route.query.pid;
    }else{
      localStorage['pid'] = ''
    }
    
    if(localStorage['uid'] && localStorage['uid']!=''){
      this.left_text = '会员中心';
      this.left_path = '/personal/index'
    }
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          
        } else {
         
        }
    })
  },
  activated(){  
    this.isFirstEnter=false;
    this.$store.dispatch('set_isback',false)
    
    if(localStorage['uid'] && localStorage['uid']!=''){
      this.left_text = '会员中心';
      this.left_path = '/personal/index'
    }
  },
}
</script>

<style scoped lang="stylus">
.announcement_list
  width 100%
  padding .3rem 
  box-sizing border-box
  margin-bottom .2rem
  background #fff
  div:first-child
    padding-bottom .15rem
  .gonggao
    width 60%
    display inline-block
    font-size 18px
  img 
    width .54rem 
    height .5rem
    margin-right .25rem
    vertical-align top
  p  
    padding-top .2rem
    padding-left .84rem
    color #333
.gray
  color #333
.blue
  color #0096ff

.van-cell .van-cell__title span{
  /* font-size:0.4rem; */
  color:#7D7D7D;
}
.van-cell__value span{
  font-size:0.3rem;
}
.van-cell{
  background:none;
  padding:0;
  padding-bottom:0.1rem;
}
/deep/ .van-dialog__content .van-cell{
  padding: 10px 15px;
}
.max_width_100{
  margin-bottom: .15rem;
  width:1.4rem;
  height: 1.4rem;
}
  select{
    outline: none;
  }
  .red{
    color:red;
  }
  .no_border{
    border:none;
  }
  .text_center{
    text-align:center;
  }
  #home_page .van-nav-bar__left .van-nav-bar__text{
    color:#FC8463;
  }
  #home_page .van-nav-bar__right .van-nav-bar__text{
    color:#2C2C2C;
  }
  .swipe_img_box{
    width:100%;
    padding:0 12px;
    box-sizing: border-box;
  }
  #home_page .van-swipe-item img{
    width:100%;
    border-radius:.2rem;
  }
  .grow_1 .van-notice-bar{
    padding:0;
    background:none !important;
  }
  .list_box{
    padding:10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .item_box{
    padding:.2rem 0;
    width:100%;
  }
  .item_box span{
    display: block;
    color: #767676;
    font-size:.38rem
  }
  #home_page .tabs_type .van-tab{
    color:#1D1D1D;
    padding:0;
  }
  #home_page .tabs_type .van-tab>span{
    font-weight:bold;
  }
  #home_page .tabs_type .van-tab--active,#home_page .van-tab--active{
    color:#E55546;
  }
  .fixed_title{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
  }
  .container
    padding-top 0!important
    background #f5f5f5
</style>
