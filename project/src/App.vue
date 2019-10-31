<template>
  <div id="app">
    <a :href="apkurl" download v-show="false" id="download_btn">1</a>
    <router-view v-if="!is_qqorwx"/>
    <div class="container" v-if="is_qqorwx" style="padding-top:0 !important;">
        <img src="./assets/jumpborwser.png" alt="" style="width:100%">
    </div>
    <div class='full_sc' v-show="loading">
      <rise-loader class="custom-class" color="#8adff4" :loading="loading" :size="15" sizeUnit="px"></rise-loader>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { gethome} from '@/api/home'
export default {
  data(){
    return {
      is_qqorwx:false,
      endtime: '',
      curtime: '',
      timer:null,
      timer_arr:[],
      curtime_arr:[],
      last_ring_time:null,
      getring_timer_arr:[],
      settimeout_timer :null,
      apkurl:''
    }
  },
  methods:{
    
  },
  created(){
    //判断是否微信或qq
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger\/[0-9]/i) || ua.match(/QQ\/[0-9]/i)){
        // this.$router.push('/home/qqOrwx');
        this.is_qqorwx = true;
    }
    //判断 浏览器类型
     if (!this.is_qqorwx && /(Android)/i.test(navigator.userAgent)) {
      if(!navigator.userAgent.match(/lotapkinstalled/i)){
        Dialog.confirm({
          title: '温馨提示',
          cancelButtonText:'关闭',
          confirmButtonText:'安装/升级',
          message: '请务必安装/升级APP以保持最新版本。'
        }).then(() => {
          // on confirm
          document.getElementById('download_btn').click();
        }).catch(() => {
          
          // on cancel
        });
      }
    }
    
  },
  mounted(){
    
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    loading (nv, ov) {
      const root = document.documentElement
      if (nv) {
        root.classList.add('_fc')
      } else {
        root.classList.remove('_fc')
      }

    }
  }
};
</script>

<style lang='stylus'>
.mian_color{
  color:#87ac55;
}
.mian_bgcolor{
  background:#87ac55 !important;
  color:#fff !important;
}
.left_width_box .van-nav-bar__left{
  left: 0;
  width: 1.5rem;
}
.orange_btn{
  background:#FC7953;
  color:#fff;
}
.left_border_ori{
  display:inline-block;
  background:#FC7953;
  width:0.08rem;
  height:0.4rem;
  position:relative;
  top:0.08rem;
  margin-right:0.1rem;
}
.dis_flex{
  display:flex;
}
.dis_flex .flex_grow_1{
  flex-grow:1;
}
.full_sc
  background-color: rgba(25, 25, 25, .6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0
  z-index: 99999
.custom-class
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
.max_width_100
    max-width:100%;
.van-tab .van-ellipsis
  overflow:visible;
.no_border_btn
    border: none;
    color: #438CEB;
    text-decoration: underline;
.ellipsis_box .van-cell__title
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  .flex_box{
      display:flex;
      align-items:center;
  }
  .flex_grow_1{
      flex-grow:1
  }
  
  .container{
    padding-top:50px !important;
    box-sizing: border-box;
  }
  .title_box.van-nav-bar .van-icon, .title_box .van-nav-bar__text:active ,.fixed_title .van-nav-bar__text:active{
    background:none;
  }
  .no_bottom_border .van-tabs__line{
    background:none;
  }
  .van-tab span{
        white-space: nowrap;
  }
  body{
    font-family:PingFang-SC-Medium;
  }
  .van-field--disabled .van-field__control, .van-field__right-icon {
    color: #333;
}
.rank_item .van-button--small{
  padding:0 0.1rem;
}
.van-button{
  white-space: nowrap;
}
textarea:disabled{
  background-color:#fff;
}
img{
  vertical-align :middle;
}
</style>
