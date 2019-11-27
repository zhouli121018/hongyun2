import request from '@/utils/request'

//获取验证码
export function getvcode(data) {
    return request({
        url: '/getvcode.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//1、用户注册协议 regist.php?f=1027&c=oppo
export function regist(data) {
    return request({
        url: '/regist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//2、手机号登录密码协议 loginbypass.php
export function loginbypass(data) {
    return request({
        url: '/loginbypass.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//3、验证码登录协议 loginbyvcode.php
export function loginbyvcode(data) {
    return request({
        url: '/loginbyvcode.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
//获取用户中心数据  我的-我的帐号数据getaccount.php
export function getaccount(data) {
    return request({
        url: '/getaccount.php',
        method: 'post',
        data
    })
}

//31、获取关于接口 getabout.php
export function getabout(data) {
    return request({
        url: '/getabout.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//支付宝支付
export function getalipayorderinfor(data) {
    return request({
        url: '/alipay_wap/getalipayorderinfor.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//获取开通Vip会员内容协议 getvipdata.php
export function getvipdata(data) {
    return request({
        url: '/getvipdata.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

// 获取微信二维码（金币和会员） 获取微信二维码（会员） getwechatcode.php
export function getwechatcode(data) {
    return request({
        url: '/getwechatcode.php',
        method: 'post',
        data
    })
}

// (新)商城-获取商品接口getproductlist.php
export function getproductlist(data) {
    return request({
        url: '/getproductlist.php',
        method: 'post',
        data
    })
}
// 41、(新)商城-获取商品详情信息接口getproduct.php
export function getproduct(data) {
    return request({
        url: '/getproduct.php',
        method: 'post',
        data
    })
}
// (新)商城-购买商品接口submitorder_buyproduct.php
export function buyproduct(data) {
    return request({
        url: '/alipay_wap/submitorder_buyproduct.php',
        method: 'post',
        data
    })
}
// (新)商城-商品订单列表接口getbuyproduct.php
export function getbuyproduct(data) {
    return request({
        url: '/getbuyproduct.php',
        method: 'post',
        data
    })
}
// 我的-我的查看预测接口getmyviewpred.php
export function getmyviewpred(data) {
    return request({
        url: '/getmyviewpred.php',
        method: 'post',
        data
    })
}
// (新)我的-获取关注的玩法接口getmyfollow.php
export function getmyfollow(data) {
    return request({
        url: '/getmyfollow.php',
        method: 'post',
        data
    })
}
// (新)我的-我的会员码接口getvipcodelist.php（会员码明细）
export function getvipcodelist(data) {
    return request({
        url: '/getvipcodelist.php',
        method: 'post',
        data
    })
}
// 买卖会员码接口getbuyvipcodedesc.php
export function getbuyvipcodedesc(data) {
    return request({
        url: '/getbuyvipcodedesc.php',
        method: 'post',
        data
    })
}
// (新)我的-提交预测接口submit_pred.php
export function submitPred(data) {
    return request({
        url: '/submit_pred.php',
        method: 'post',
        data
    })
}
// (新)我的-我的提款列表接口getmytikuan.php
export function getmytikuan(data) {
    return request({
        url: '/getmytikuan.php',
        method: 'post',
        data
    })
}
// (新)我的-收入明细接口getmyincome.php
export function getmyincome(data) {
    return request({
        url: '/getmyincome.php',
        method: 'post',
        data
    })
}
// (新)我的-修改资料modify_userinfor.php
export function modifyUserinfor(data) {
    return request({
        url: '/modify_userinfor.php',
        method: 'post',
        data
    })
}
// (新)我的关注的彩友接口getmyfollow_caiyou.php
export function getmyfollowCaiyou(data) {
    return request({
        url: '/getmyfollow_caiyou.php',
        method: 'post',
        data
    })
}
// (新)首页-参与规则接口getjoinrule.php
export function getjoinrule(data) {
    return request({
        url: '/getjoinrule.php',
        method: 'post',
        data
    })
}
// (新)彩友圈-关注彩友接口follow_tiezi_user.php
export function followTieziUser(data) {
    return request({
        url: '/follow_tiezi_user.php',
        method: 'post',
        data
    })
}
// (新)我的-提交预测条件接口getpredcondition.php
export function getpredcondition(data) {
    return request({
        url: '/getpredcondition.php',
        method: 'post',
        data
    })
}
// (新)我的-专家分享页接口getexpert_share.php
export function getexpertShare(data) {
    return request({
        url: '/getexpert_share.php',
        method: 'post',
        data
    })
}
// 59、(新)首页-获取过滤条件接口getfiltcondition.php
export function getfiltcondition(data) {
    return request({
        url: '/getfiltcondition.php',
        method: 'post',
        data
    })
}
// 60、(新)首页-获取我的历史过滤接口getfiltlist_my.php
export function getfiltlist_my(data) {
    return request({
        url: '/getfiltlist_my.php',
        method: 'post',
        data
    })
}
// (新)首页-修改历史过滤接口modify_filtname.php
export function modify_filtname(data) {
    return request({
        url: '/modify_filtname.php',
        method: 'post',
        data
    })
}
// 62、(新)首页-过滤接口filt.php
export function filt(data) {
    return request({
        url: '/filt.php',
        method: 'post',
        data
    })
}

// getbuyjindoudesc.php 购买金豆页面数据
export function getbuyjindoudesc(data) {
    return request({
        url: '/getbuyjindoudesc.php',
        method: 'post',
        data
    })
}
// 获取免费试用内容getfreeusedesc.php
export function getfreeusedesc(data) {
    return request({
        url: '/getfreeusedesc.php',
        method: 'post',
        data
    })
}
// 商城-微信购买商品接口wepay/submitorder_buyproduct.php
export function submitorder_buyproduct(data) {
    return request({
        url: '/wepay/submitorder_buyproduct.php',
        method: 'post',
        data
    })
}
//(新)首页-获取规则接口 getrule.php
export function getrule (data) {
    return request({
      url: '/getrule.php',
      method: 'post',
      data:{
        ...data
      }
    })
  }
