<template>
    <div>
        <title-bar title_name="发表"/>
        <div style="width:2.4rem;padding:.69rem 0 .5rem .54rem;">
            <van-dropdown-menu>
                <van-dropdown-item v-model="option_value" :options="option" @change="change" />
            </van-dropdown-menu>
        </div>
        <div class="address">
            <img src="~@/assets/dingwei.png" alt=""> 地址：*****
        </div>
        <div class="area">
            <div class="box"></div>
        </div>
        <div class="btn_box">
            <van-button size="normal" @touchstart.native="start" @touchend.native="stop" @click.native="play" :color="desc=='长按录音'?'':'#87ac55'"> 
                <img v-if="desc=='点击播放'" src="~@/assets/yy.png" style="width:0.29rem;height:0.33rem;" alt="" >
                <img v-else src="~@/assets/luyin.png" style="width:.32rem" /> 
                {{desc}}</van-button>
        </div>
        <div class="upload_box">
            <van-uploader :after-read="afterRead" multiple v-model="fileList"/>
        </div>
        <div class="bottom_btn_box">
            <van-button >提交</van-button>
            <span class="pub" @click="jumpTo('/home/tiaokuan')">发表条款</span>
        </div>

    </div>
</template>

<script>
import md5 from 'js-md5'
import { formatDates } from '@/utils'
import { uploadimg } from '@/api/home'
export default {
    data(){
        return {
            list:[
                {},{}
            ],
            option_value:'a',
            option: [
                { text: '讨论区', value: 'a' },
                { text: '晒奖区', value: 'b' },
            ],

            rec:null,
            audio:null,
            blob:null,
            desc:'长按录音',
            start_status:false,
            start_timer:null,
            fileList:[]
        }
    },
    methods:{
        jumpTo(path){
            this.$router.push(path)
        },
        change(val){
            this.$toast(val)
        },
        //上传图片
        async afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            // 此时可以自行将文件上传至服务器
            let now = new Date();
            let md5_data = md5('token=' + now.getTime() + '&key=lldu43d98382');
            const formData = new FormData()
            formData.append('image', file.file)
            formData.append('token',now.getTime())
            formData.append('data',md5_data)
            formData.append('sid',localStorage.getItem('hsid'))
            formData.append('uid',localStorage.getItem('huid'))
            const { data } = await uploadimg(formData)
            console.log(data)
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
                    console.log((window.URL||webkitURL).createObjectURL(blob),"时长:"+duration+"ms");
                    this.rec.close();//释放录音资源
                    this.start_status = false;
                    this.desc = '点击播放'
                    //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
                    this.blob = blob;
                },(msg)=>{
                    this.$toast("录音失败:"+msg)
                });
            }
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
        }


    }
        
}
</script>

<style lang="stylus" scoped>
/deep/ .van-dropdown-menu  
        background #87AC55
        height 26px
        border-radius 5px
        .van-dropdown-menu__title 
            color #fff
            .van-ellipsis
                font-size .37rem

.address
    color #666666
    padding-left:.54rem
    font-size .4rem
    img 
        width .3rem
.area
    padding:0.32rem .54rem
    .box
        border 1px solid #A5A5A5
        height 3.9rem
        width 8.9rem
.btn_box
    padding:0.22rem .54rem 0
    button 
        background #EDEDED
        color #A5A5A5
        font-size .4rem
        width 3.37rem
        height 1rem
        border-radius .1rem
        line-height .8rem
.upload_box
    padding:0.75rem .54rem 0
    /deep/ .van-uploader__upload
        background-color #EDEDED
.bottom_btn_box
    padding:1.32rem  0 0
    button 
        margin-left 2.96rem
        background #87AC55
        color #ffffff
        font-weight bold
        font-size .53rem
        width 4rem
        height 1.2rem
        line-height: 1rem;
        margin-right .6rem
    .pub
        color #00A8FF
        border-bottom 1px solid #00a8ff
        vertical-align: sub;
        font-size .35rem
</style>

