/* 
  首页模块
*/
import request from '@/utils/request'

export function deviceList (data) {
  return request({
    url: '/Wxsite/Site/api',
    method: 'post',
    data:{
      api_name: 'siteList',
      ...data
    }
  })
}
//获取首页内容
export function gethome (data) {
  return request({
    url: '/gethome_new.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取公告列表协议 getnotices.php
export function getnotices (data) {
  return request({
    url: '/getnotices.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取公告内容协议 notice.php?noticeid=100
export function notice (data) {
  return request({
    url: '/notice.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//15、获取推荐赚佣金内容 getearnmoneydesc.php
export function getearnmoneydesc (data) {
  return request({
    url: '/getearnmoneydesc.php ',
    method: 'post',
    data:{
      ...data
    }
  })
}

//16、佣金提款 submittikuan.php
export function submittikuan (data) {
  return request({
    url: '/submittikuan.php ',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取推荐页数据
export function gettuijiancode (data) {
  return request({
    url: '/gettuijiancode.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//20、(新)首页-获取奖表接口 getlottable.php
export function getlottable (data) {
  return request({
    url: '/getlottable.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//21、(新)首页-获取奖图接口 getlotmap.php
export function getlotmap (data) {
  return request({
    url: '/getlotmap.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//22、(新)首页-获取幸运用户接口 getdayluckuser.php
export function getdayluckuser (data) {
  return request({
    url: '/getdayluckuser.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//23、(新)首页-获取专家排名奖励接口 getrankaward_exp.php
export function getrankaward_exp (data) {
  return request({
    url: '/getrankaward_exp.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//24、(新)首页-获取梦兆列表接口 getmengzhaolist.php
export function getmengzhaolist (data) {
  return request({
    url: '/getmengzhaolist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//25、(新)榜单-获取榜单排名接口 getpredrank.php
export function getpredrank (data) {
  return request({
    url: '/getpredrank.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//26、(新)榜单-获取搜索专家接口 getsearchlist.php
export function getsearchlist (data) {
  return request({
    url: '/getsearchlist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//27、(新)榜单-查看预测 view_pred.php
export function view_pred (data) {
  return request({
    url: '/view_pred.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//28、(新)榜单-关注玩法接口 follow_playtype.php
export function follow_playtype (data) {
  return request({
    url: '/follow_playtype.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//29、(新)榜单-获取专家预测列表接口 getexpert.php
export function getexpert (data) {
  return request({
    url: '/getexpert.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//30、(新)彩友圈-获取帖子接口 gettiezilist.php
export function gettiezilist (data) {
  return request({
    url: '/gettiezilist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//32、(新)彩友圈-上传图片接口 uploadimg.php
export function uploadimg (data) {
  return request({
    url: '/uploadimg.php',
    method: 'post',
    data
  })
}

//33、(新)彩友圈-举报帖子接口 submitjubao.php
export function submitjubao (data) {
  return request({
    url: '/submitjubao.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//34、(新)彩友圈-关注帖子接口 follow_tiezi.php
export function follow_tiezi (data) {
  return request({
    url: '/follow_tiezi.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//35、(新))彩友圈-帖子点赞 submit_like.php
export function submit_like (data) {
  return request({
    url: '/submit_like.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//36、(新)彩友圈-评论帖子接口 submittizi_disc.php
export function submittizi_disc (data) {
  return request({
    url: '/submittizi_disc.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//37、(新)彩友圈-获取帖子详情 gettiezi_disclist.php
export function gettiezi_disclist (data) {
  return request({
    url: '/gettiezi_disclist.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//38、(新)彩友圈-获取发布条款接口 gettiaokuan.php
export function gettiaokuan (data) {
  return request({
    url: '/gettiaokuan.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//39、(新)彩友圈-获取个人彩友圈帖子 gettiezilist_user.php
export function gettiezilist_user (data) {
  return request({
    url: '/gettiezilist_user.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//57、(新)我的-上传音频接口 uploadaudio.php 
export function uploadaudio (data) {
  return request({
    url: '/uploadaudio.php',
    method: 'post',
    data
  })
}

//63、(新)首页-获取走势图数据接口 gettrenddata.php
export function gettrenddata (data) {
  return request({
    url: '/gettrenddata.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//31、(新)彩友圈-发表帖子接口 submittizi.php
export function submittizi (data) {
  return request({
    url: '/submittizi.php',
    method: 'post',
    data:{
      ...data
    }
  })
}





