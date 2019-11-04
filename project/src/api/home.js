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