<template>
    <div >
        <div :class="{has_bot:has_bot}" @click="has_bot = false" style="position:absolute;top:50px;bottom:0;left:0;right:0;overflow: auto;">
            <title-bar title_name="评论"/>
            <div class="content_item" v-if="info"> 
                <div class="flex line_1" @click="goSingle">
                    <img :src="$https_img+'/'+info.icon" alt="">
                    <div class="flex_grow_1">
                        <div>
                            <span class="uname">{{info.username}}</span>
                            <img v-if="info.isexp==1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                            <img v-if="info.isvip==1" src="../../assets/vip.png" alt="">
                        </div>
                        
                        <div class="time">{{info.ptime}}</div>
                    </div>
                </div>
                <div class="line_2">{{info.content}}</div>
                <div class="flex line_3">
                    <div class="img_box"  :class="{center_box:(i%3==1)}" v-for="(m,i) in info.imgs" :key="i" @click="prev_img(i)">
                        <img :src="$https_img+'/'+m" alt="" style="width:100%;">
                    </div>
                </div>
                <div class="flex line_4">
                    <div class="flex_grow_1" v-if="info.loca"><img src="~@/assets/dingwei.png" alt="1" style="width:.26rem"> {{info.loca}}</div>
                    <div class="flex_grow_1" @click.stop="show_bottom"><img src="~@/assets/pinglun.png" alt="1" style="width:.33rem"> 评论({{info.dtimes}})</div>
                    <div class="flex_grow_1 m-share" @click="pop"><img src="~@/assets/zhuanfa.png" alt="1" style="width:.36rem"> 转发({{info.stimes}})</div>
                    <div class="flex_grow_1" @click="submit_like"><img src="~@/assets/dianzan.png" alt="1" style="width:.3rem"> 点赞({{info.ztimes}})</div>
                </div>
            </div>
            <div style="background:#F5F5F5;height:0.2rem;"></div>
            <div v-for="(item,index) in list" :key="index">
                <div class="list_item">
                    <div class="flex line_1">
                        <div class="flex_grow_1">
                            <div>
                                <span class="uname">{{item.username}}</span>
                                <img v-if="info.isexp==1" class="zhuan_img" src="../../assets/zhuan.png" alt="">
                                <img v-if="info.isvip==1" src="../../assets/vip.png" alt="">
                            </div>
                        </div>
                        <div class="time">{{item.ptime}}</div>
                    </div>
                    <div class="line_2">
                        <span class="text_s">{{item.content}}</span> 
                        <van-button v-if="item.soundurl" @click="play_sound('myaudio_'+index)" style="background:#87AC55;color:#fff;width:2.76rem;font-size:.24rem;height:.73rem;line-height:.425rem;border-radius:.08rem;"><img src="~@/assets/yuyin.png" alt="1" style="width:.3rem;"> 点击听语音</van-button>
                        <audio :id="'myaudio_'+index" preload="load" :src="$https_img+'/'+item.soundurl" controls="controls" :loop="false" v-show="false"></audio>
                        <img src="~@/assets/pinglun.png" alt="1" style="width:.33rem;float:right" @click.stop="show_bottom(item)">
                    </div>
                    <div  v-if="item.parentItem" style="background:#EDEDED;position:relative;padding:.35rem .36rem;color:#666666;border-radius:.08rem;">
                        <div>
                            <span style="color:#FF0B60;font-size:.4rem;">@{{item.parentItem.username}}</span>
                            <span style="font-size:.35rem">{{item.parentItem.ptime}}</span>
                            <div style="padding:.36rem 0 .2rem;font-size:.35rem;">
                                {{item.parentItem.content}} 
                                <van-button v-if="item.parentItem.soundurl" @click="play_sound('myaudio_child_'+index)" style="background:#87AC55;color:#fff;width:2.76rem;font-size:.24rem;height:.73rem;line-height:.425rem;border-radius:.08rem;"><img src="~@/assets/yuyin.png" alt="1" style="width:.3rem;"> 点击听语音</van-button>
                                <audio :id="'myaudio_child_'+index" preload="load" :src="$https_img+'/'+item.parentItem.soundurl" controls="controls" :loop="false" v-show="false"></audio>
                            </div>
                        </div>
                        <div style="width:0;height: 0;border-width: .3rem;border-style: solid;border-color: transparent transparent #EDEDED transparent;position:absolute;top:-.6rem;left:.3rem;"></div>
                    </div>
                    
                </div>
                <div style="background:#F5F5F5;height:0.2rem;"></div>
            </div>

            <div style="color:#a4d068;text-align:center;padding:.4rem 0;" v-if="lastid>0" @click="load_more"> 加载更多</div>
        </div>
        

        <div v-show="has_bot" class="flex" style="background:#E9E9E9;height:1.4rem;position:absolute;bottom:0;width:100%;">
            <img src="~@/assets/luyin.png" style="width:0.45rem;height:0.64rem;margin:0 .3rem;" alt="" @click="volumn = !volumn">
            <van-field style="border-radius:.1rem;" ref="pinglun_input"
                v-model="value" maxlength="200" 
                clearable v-show="!volumn"
                placeholder="我也说说...(最多200字以内）"
            >
            </van-field>
            <van-button v-show="volumn" class="flex_grow_1"  @touchstart.native="start" @touchend.native="stop" @click.native="play" :color="desc=='长按录音'?'':'#87ac55'">{{desc}}</van-button>
            <van-button size="small" color="#87AC55" @click="submittizi_disc" style="margin:0 .3rem;border-radius:.1rem;">发布</van-button>
        </div>

        <van-popup v-if="has_bot"
        v-model="has_bot"
        position="bottom"
        :style="{ height: '1.4rem' }"
        >
            <!-- <div style="text-align:center;padding:.4rem 0 .4rem;font-size:.45rem;border-bottom:1px dashed #aaa;">{{pl_title}}</div> -->
            <div class="flex" style="background:#E9E9E9;height:1.4rem;position:absolute;bottom:0;width:100%;">
                <img src="~@/assets/luyin.png" style="width:0.45rem;height:0.64rem;margin:0 .3rem;" alt="" @click="volumn = !volumn">
                <van-field style="border-radius:.1rem;" ref="pinglun_input"
                    v-model="value" maxlength="200" 
                    clearable v-show="!volumn"
                    placeholder="我也说说...(最多200字以内）"
                >
                </van-field>
                <van-button v-show="volumn" class="flex_grow_1"  @touchstart.native="start" @touchend.native="stop" @click.native="play" :color="desc=='长按录音'?'':'#87ac55'">{{desc}}</van-button>
                <van-button size="small" color="#87AC55" @click="submittizi_disc" style="margin:0 .3rem;border-radius:.1rem;">发布</van-button>
            </div>
        </van-popup>

    </div>
</template>

<script>
import md5 from 'js-md5'
import {gettiezi_disclist, submit_like, submittizi_disc, uploadaudio } from '@/api/home'
import { ImagePreview } from 'vant';
import Mshare from 'm-share'
export default {
    data(){
        return {
           list:[],
           isFirstEnter:false,
           lastid:0,
           jubos:[],
           info:null,
           show_img:false,
           big_imgs:[],
           value:'',
           has_bot:false,
           pid:'',
           volumn:false,
           desc:'长按录音',
           start_status:false,
           start_timer:null,
           sound:'',
        }
    },
    methods:{
        play_sound(id){
            let audios = document.querySelectorAll('audio');
            if(audios.length>0){
                audios.forEach(val=>{
                    val.pause();
                    val.currentTime = 0; //如只暂停则不需要此行
                })
            }
            document.getElementById(id).play()
        },
        start(){
            this.start_timer = setTimeout(()=>{
                this.rec=Recorder({type:"mp3",sampleRate:16000});
                if(this.rec){
                    this.rec.close();
                    this.rec.open(()=>{//打开麦克风授权获得相关资源
                        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
                        this.rec.start();//开始录音
                        this.start_status = true;
                        this.desc = '松开停止录音'
                    },(msg,isUserNotAllow)=>{//用户拒绝未授权或不支持
                        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
                        this.$toast((isUserNotAllow?"UserNotAllow，":"")+"无法录音:"+msg)
                    });
                }else{
                    this.$toast('初始化录音失败！')
                }
            },500);
        },
        stop(){
            clearTimeout(this.start_timer);
            this.start_timer = null
            if(this.start_status){
                this.rec.stop((blob,duration)=>{//到达指定条件停止录音
                    this.rec.close();//释放录音资源
                    this.start_status = false;
                    this.desc = '点击播放'
                    //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
                    this.blob = blob;
                    this.uploadaudio(blob)
                },(msg)=>{
                    this.$toast("录音失败:"+msg)
                });
            }
        },
        async uploadaudio (blob){
            let now = new Date();
            let md5_data = md5('token=' + now.getTime() + '&key=lldu43d98382');
            const formData = new FormData()
            formData.append('file', blob)
            formData.append('token',now.getTime())
            formData.append('data',md5_data)
            formData.append('sid',localStorage.getItem('hsid'))
            formData.append('uid',localStorage.getItem('huid'))
            const { data } = await uploadaudio(formData)
            this.sound = data.url
        },
        play(){
            /*立即播放例子*/
            if(this.blob){
                this.audio=document.createElement("audio");
                this.audio.controls=false;
                document.body.appendChild(this.audio);
                //简单的一哔
                this.audio.src=(window.URL||webkitURL).createObjectURL(this.blob);
                this.audio.play();
                // this.audio.remove();
            }
        },
        async submittizi_disc(){
            let obj = {
                tid: this.info.tid
            }
            if(this.pid){
                obj.pid = this.pid;
            }
            if(this.volumn){
                if(this.sound){
                    obj.sound = this.sound;
                }else{
                    this.$toast('请先录音~')
                    return;
                }
            }else{
                if(this.value){
                    obj.content = this.value;
                }else{
                    this.$toast('请输入内容~')
                    return;
                }
            }
            const {data} = await submittizi_disc(obj);
            if(data.errorcode == 0){
                this.has_bot = false;
                this.sound = '';
                this.desc = '长按录音'
                this.start_status = false;
                this.start_timer = null;
                this.value = '';
                this.lastid = 0;
                this.gettiezi_disclist();
            }
        },
        show_bottom(item){
            if(item){
                this.pid = item.discid;
            }else{
                this.pid = '';
            }
            this.has_bot = true;
            this.$nextTick(()=>{
                this.$refs.pinglun_input.focus();
            })
        },
        goSingle(){
            this.$router.push({
                path:'/home/single_caoyouquan',
                query:{
                    expid:this.info.userid
                }
            })
        },
        prev_img(index){
            ImagePreview({
                images:this.big_imgs,
                startPosition: index,
            });
        },
        onChange(index) {
            this.index = index;
        },
        async gettiezi_disclist(){
            let ishead = 1;
            if(this.lastid>0){
                ishead = 0;
            }
            let obj = {
                tid:this.$route.query.tid,  
                ishead:1, 
                lastid:this.lastid
            };
            const {data} = await gettiezi_disclist(obj)

            this.big_imgs = [];
            if(data && data.big_imgs && data.big_imgs.length>0){
                data.big_imgs.forEach(val=>{
                    this.big_imgs.push(this.$https_img+'/'+val)
                })
            }
            this.info = data;
            if(this.lastid > 0){
                this.list = this.list.concat(data.list);
            }else{
                this.list = data.list
            }
            this.lastid = data.lastid;
            
            this.jubos = data.jubos;
        },
        load_more(){
            this.gettiezi_disclist();
        },

        //点赞
        async submit_like(){
            let obj = {
                tid:this.info.tid,
            }
            const {data} = await submit_like(obj);
            this.info.ztimes = data.zannum
        },
        //转发
        pop(){
            const config = {
                link:  '', // 网址，默认使用window.location.href  http://www.qq.com
                title: '',  // 标题，默认读取document.title 
                desc:  '', // 描述, 默认读取<meta name="description" content="desc" />
                imgUrl: '' ,// 图片, 默认取网页中第一个img标签
                types: ['wx', 'wxline', 'qq', 'qzone', 'sina'], // 启用的社交分享,默认为全部启用
                infoMap: { // 针对不同平台设定不同分享内容
                    wx: {
                    link: '', // 覆盖分享到微信的链接
                    title: '', // 覆盖分享到微信的标题
                    desc: '', // 覆盖分享到微信的标题
                    imgUrl: '' // 覆盖分享到微信的图片链接
                    }
                },
                fnDoShare(type) {
                    // 执行分享的回调，type为'wx', 'wxline', 'qq', 'qzone', 'sina'
                }
            };
            this.config = config;
            Mshare.popup( this.config);
        },
    },
    
    created(){
        this.isFirstEnter=true;
    },
    activated(){
        this.has_bot = false;
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.lastid = 0;
            this.gettiezi_disclist();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
        
}
</script>

<style lang="stylus" scoped>
.has_bot
    bottom:1.5rem !important
.content_item
    padding .4rem .6rem
    .line_1
        .flex_grow_1
            padding-left .23rem
            span.uname
                font-size:.42rem;
                color:#333;
                font-family:PingFang SC;
                margin-right: .11rem;
            img
                width .6rem
                height .6rem
                vertical-align middle
            .zhuan_img
                margin-right .19rem
        .time
            padding-top .35rem
            font-size .32rem
        img
            width 1.45rem
            height 1.45rem
    .line_2
        padding .35rem 0
        font-size .4rem
        color #333
        line-height .53rem
    .line_3
        flex-wrap wrap
        .img_box
            width 2.62rem
            height 2.62rem
            background #F5F5F5
            margin-bottom .2rem
            &.center_box
                margin 0 .4rem .2rem
    .line_4
        padding .7rem 0 .37rem
        .flex_grow_1
            font-size .27rem
            color #333

.list_item
    padding .4rem .6rem
    .line_1
        align-items flex-start
        .flex_grow_1
            span.uname
                font-size:.42rem;
                color:#333;
                font-family:PingFang SC;
                margin-right: .11rem;
            img
                width .6rem
                height .6rem
                vertical-align middle
            .zhuan_img
                margin-right .19rem
        .time
            color #333;
            font-size .32rem
    .line_2
        padding .35rem 0
        .text_s
            font-size .4rem
            color #333
            line-height .53rem
</style>

