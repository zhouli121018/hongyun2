<template>
    <div>
        <title-bar title_name="彩友圈" right_text="发表" right_url="/home/publish"/>
        <div class="top_menu">
            <span class="item plq" :class="{active:areatype==0}" @click="change_area(0)">评论区</span>
            <span class="item" :class="{active:areatype==1}" @click="change_area(1)">晒奖区</span>
        </div>
        <div class="newest">
            <span class="item first" :class="{active:timetype==0}" @click="change_time(0)">最新</span>
            <span class="item" :class="{active:timetype==1}" @click="change_time(1)">最热</span>
        </div>
        
        <div  v-for="(item,index) in list" :key="index">
            <div class="content_item">
                <div class="flex line_1" @click="goSingle(item)">
                    <img src="http://sscby.cn/hysm/defaulticon.png" alt="">
                    <div class="flex_grow_1">
                        <div class="uname flex">
                            <span class="flex_grow_1">{{item.username}}</span>
                            <img src="~@/assets/more.png" style="width:.53rem;height:.11rem;" @click.stop="show_more(item)">
                        </div>
                        <div class="time">{{item.ptime}}</div>
                    </div>
                </div>
                <div class="line_2" @click="goComment(item)">{{item.content}}</div>
                <div v-if="item.soundurl">
                    <van-button color="#87AC55" size="small" style="width:2.76rem;height:.81rem;border-radius:.1rem;margin-bottom:.33rem;" @click="play_sound('myaudio_'+index)"><img src="~@/assets/yy.png" style="width:0.29rem;height:0.33rem;" alt="" > 点击听语音</van-button>
                    <audio :id="'myaudio_'+index" preload="load" :src="$https_img+'/'+item.soundurl" controls="controls" :loop="false" v-show="false"></audio>
                </div>
                <div class="flex line_3">
                    <div class="img_box"  :class="{center_box:(i%3==1)}" v-for="(m,i) in item.imgs" :key="i" @click="prev_img(item,i)">
                        <img :src="$https_img+'/'+m" alt="" style="width:100%;">
                    </div>
                    <!-- <div class="img_box" :class="{center_box:((i+2)%3==1)}" v-for="(m,i) in item.imgs" :key="2+i"></div>
                    <div class="img_box" :class="{center_box:((i+4)%3==1)}" v-for="(m,i) in item.imgs" :key="4+i"></div> -->
                </div>
                <div class="flex line_4">
                    <div class="flex_grow_1" v-if="item.loca"><img src="~@/assets/dingwei.png" alt="1" style="width:.26rem"> {{item.loca}}</div>
                    <div class="flex_grow_1" @click="pinglun_click(item)"><img src="~@/assets/pinglun.png" alt="1" style="width:.33rem"> 评论({{item.dtimes}})</div>
                    <div class="flex_grow_1 m-share" @click="pop"><img src="~@/assets/zhuanfa.png" alt="1" style="width:.36rem"> 转发({{item.stimes}})</div>
                    <div class="flex_grow_1" @click="submit_like(item)"><img src="~@/assets/dianzan.png" alt="1" style="width:.3rem"> 点赞({{item.ztimes}})</div>
                </div>
            </div>
            <div style="background:#F5F5F5;height:0.2rem;"></div>
        </div>

        <div style="color:#a4d068;text-align:center;padding:.4rem 0;" v-if="lastid>0" @click="gettiezilist"> 加载更多</div>

        <van-dialog
            title=""
            v-model="show"
            confirm-button-text="关闭"
            >
            <div style="padding:.4rem 0;">
                <img :src="img_src" alt="" style="width:100%" v-if="img_src"/>
            </div>
            
        </van-dialog>
        
        <van-dialog
            title="请选择操作"
            :close-on-click-overlay="true"
            show-cancel-button
            v-model="show_bottom"
            confirm-button-text="确定"
            cancel-button-text="关闭"
            :before-close="beforeClose"
            >
            <div style="padding:.4rem 0;">
                <van-radio-group v-model="radio">
                    <van-radio name="1">{{cur_item.isfollow=='1'?'取消关注':'关注'}}</van-radio>
                    <van-radio name="2">举报</van-radio>
                </van-radio-group>
                <div style="padding-left:.8rem;" v-if="radio == '2'">
                    违规事项:
                    <select v-model="jub_value" style="outline:none;background:#fff;">
                        <option :value="j.id" v-for="j in jubos" :key="j.id">{{j.content}}</option>
                    </select>
                </div>
            </div>
        </van-dialog>

        
        <van-popup v-if="show_pinglun"
        v-model="show_pinglun"
        position="bottom" 
        :style="{ height: '2.2rem' }"
        >
        <div style="text-align:center;padding:.2rem 0 .2rem;font-size:.45rem;border-bottom:1px dashed #aaa;">{{pl_title}}</div>
            <div  class="flex" style="background:#E9E9E9;height:1.4rem;width:100%;">
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
import Mshare from 'm-share'
import {gettiezilist, submitjubao, follow_tiezi, submit_like, submittizi_disc, uploadaudio } from '@/api/home'
import { ImagePreview } from 'vant';
export default {
    data(){
        return {
            list:[],
            jubos:[],
            isFirstEnter:false,
            areatype:0, //0讨论区，1晒奖区 
            timetype:0, //0最新，1最热
            lastid:0,
            show:false,
            img_src:'',
            show_bottom:false,
            show_pinglun:false,
            pl_title:'',
            config:{},
            radio:'1',
            jub_value:'1',
            cur_item:{},
            big_imgs:[],
            value:'',
            volumn:false,
            desc:'长按录音',
            start_status:false,
            start_timer:null,
            sound:'',
            blob:null,
        }
    },
    methods:{
        goSingle(item){
            this.$router.push({
                path:'/home/single_caoyouquan',
                query:{
                    expid:item.userid
                }
            })
        },
        goComment(item){
            this.$router.push({
                path:'/home/comment',
                query:{
                    tid:item.tid
                }
            })
        },
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
        pinglun_click(item){
            this.pl_title = item.username
            this.cur_item = item;
            this.show_pinglun = true;
            this.$nextTick(()=>{
                this.$refs.pinglun_input.focus();
            })
        },
        show_more(item){
            this.show_bottom = true;
            this.cur_item = item;
        },
        change_area(area){
            this.areatype = area;
            this.lastid = 0;
            this.gettiezilist();
        },
        change_time(time){
            this.timetype = time;
            this.lastid = 0;
            this.gettiezilist();
        },
        async gettiezilist(){
            let obj = {
                areatype:this.areatype,  
                timetype:this.timetype, 
                lastid:this.lastid
            };
            const {data} = await gettiezilist(obj)
            if(this.lastid > 0){
                this.list = this.list.concat(data.list);
            }else{
                this.list = data.list
            }
            this.lastid = data.lastid;

            this.jubos = data.jubos;
            this.jubos.forEach(val=>{
                val.value = val.id;
                val.text = val.content;
            })
        },
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
        prev_img(item,i){
            this.big_imgs = [];
            item.big_imgs.forEach(val=>{
                this.big_imgs.push(this.$https_img+'/'+val);
            })
            ImagePreview({
                images:this.big_imgs,
                startPosition: i,
            });
        },
        beforeClose(action,done){
            if(action == 'confirm'){
                if(this.radio == '1'){
                    this.follow_tiezi();
                }else if(this.radio == '2'){
                    this.submitjubao();
                }
            }
            done();
            this.radio = '1';
            this.jub_value = '1';
        },
        async follow_tiezi(){
            let type = 0;
            if(this.cur_item.isfollow == '0'){
                type = 1;
            }
            let obj = {
                tid:this.cur_item.tid,
                type:type
            }
            const {data} = await follow_tiezi(obj);
            if(data.errorcode == 0){
                this.gettiezilist();
            }

        },
        async submitjubao(){
            let obj = {
                tid:this.cur_item.tid,
                jbuserid:this.cur_item.userid,
                jbcontentid:this.jub_value,
            }
            const {data} = await submitjubao(obj);

        },
        async submit_like(item){
            let obj = {
                tid:item.tid,
            }
            const {data} = await submit_like(obj);
            item.ztimes = data.zannum
        }, 
        async submittizi_disc(item){
            let obj = {
                tid:item.tid,
            }
            const {data} = await submittizi_disc(obj);
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
                tid: this.cur_item.tid
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
                this.show_pinglun = false;
                this.sound = '';
                this.desc = '长按录音'
                this.start_status = false;
                this.start_timer = null;
                this.value = '';
                this.lastid = 0;
                this.gettiezilist();
            }
        },

    },
    created(){
        this.isFirstEnter=true;
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.lastid = 0;
            this.areatype = 0 
            this.timetype = 0
            this.gettiezilist();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
        
}
</script>

<style lang="stylus" scoped>
/deep/ .van-radio-group>div
    padding .2rem 0
/deep/ .van-popup 
    .van-field__label
        width 1.2rem
    .van-field__body
        align-items flex-start
.top_menu
    padding .4rem .6rem 0
    border-bottom 2px solid #E3E3E3
    .item
        color #333333
        font-size .48rem
        border-bottom 3px solid transparent
        padding-bottom .3rem
        display: inline-block;
        &.plq
            margin-right .92rem
        &.active
            color #87AC55
            border-bottom 3px solid #87AC55

.newest
    padding .4rem .6rem
    text-align right
    .item
        color #CCCCCC
        font-size .37rem
        &.first
            margin-right .67rem
        &.active
            color #87AC55
.content_item
    padding .4rem .6rem
    
    .line_1
        .flex_grow_1
            padding-left .23rem
        .uname
            font-size .43rem
            color #333
            padding-bottom .35rem
        .time
            font-size .32rem
        img
            width 1.45rem
            height 1.45rem
    .line_2
        padding .35rem 0
        font-size .4rem
        color #333
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
</style>

