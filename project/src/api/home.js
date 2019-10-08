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
    url: '/gethome.php',
    method: 'post',
    data:{
      ...data
    }
  })
}
