const _import = require(`./_import_${process.env.NODE_ENV}`)
const layout = _import('layout/index')
const layouts = _import('index')

/**
 *
 * meta 标签字段
 * @param {*} requiredUserInfo: [boolean]  该页面是否需要用户信息，如果需要store里没有用户信息将会去拉取用户信息
 * @param {*} white: [boolean]             白名单页面，路由拦截器不拦截，直接放行
 * @param {*} cache: [boolean]             是否缓存 配合keep-alive
 */

export default [
    {
        path: '/',
        redirect:'/home/index',
    },
    {
        //带底部栏页面
        path: '/home',
        component:layouts,
        children: [
            {//首页
                path: 'index',
                name:'home',
                component: _import('home/index'),
                meta:{
                    title:'鸿运四码',
                    cache: true,
                    has_bottom:true
                }
            },
            {//商城
                path: 'shopping',
                name:'shopping',
                component: _import('home/shopping'),
                meta:{
                    title:'商城',
                    cache: true,
                    has_bottom:true
                }
            },
            {//订单
                path: 'order',
                name:'order',
                component: _import('home/order'),
                meta:{
                    title:'订单',
                    cache: true,
                }
            },
            {//订单列表
                path: 'orderList',
                name:'orderList',
                component: _import('home/orderList'),
                meta:{
                    title:'订单列表',
                    cache: false,
                }
            },
            {//榜单
                path: 'bangdan',
                name:'bangdan',
                component: _import('home/bangdan'),
                meta:{
                    title:'榜单',
                    cache: true,
                    has_bottom:true
                }
            },
            {//搜索  榜单2
                path: 'search',
                name:'search',
                component: _import('home/search'),
                meta:{
                    title:'搜索',
                    cache: true,
                    has_bottom:true
                }
            },
            {//彩友圈
                path: 'caiyouquan',
                name:'caiyouquan',
                component: _import('home/caiyouquan'),
                meta:{
                    title:'彩友圈',
                    cache: true,
                    has_bottom:true
                }
            },
            {//彩友圈-发表
                path: 'publish',
                name:'publish',
                component: _import('home/publish'),
                meta:{
                    title:'发表',
                    cache: true,
                }
            },
            {//彩友圈-评论
                path: 'comment',
                name:'comment',
                component: _import('home/comment'),
                meta:{
                    title:'评论',
                    cache: true,
                }
            },
            {//个人彩友圈
                path: 'single_caoyouquan',
                name:'single_caoyouquan',
                component: _import('home/single_caoyouquan'),
                meta:{
                    title:'个人彩友圈',
                    cache: true,
                }
            },
            {//过滤 
                path: 'filter',
                name:'filter',
                component: _import('home/filter'),
                meta:{
                    title:'过滤',
                    cache: true,
                }
            },
            {//历史过滤条件 
                path: 'historyFilter',
                name:'historyFilter',
                component: _import('home/historyFilter'),
                meta:{
                    title:'历史过滤条件',
                    cache: true,
                }
            },
            {//奖表
                path: 'lottable',
                name: 'lottable',
                component: _import('home/lottable'),
                meta: {
                    title: '奖表',
                    cache: false
                }
            },
            {//奖图
                path: 'lotmap',
                name: 'lotmap',
                component: _import('home/lotmap'),
                meta: {
                    title: '奖图',
                    cache: false
                }
            },
            {//遗漏
                path: 'yilou',
                name: 'yilou',
                component: _import('home/yilou'),
                meta: {
                    title: '遗漏',
                    cache: false
                }
            },
            {//走势图
                path: 'zoushi',
                name: 'zoushi',
                component: _import('home/zoushi'),
                meta: {
                    title: '走势图',
                    cache: false
                }
            },
            {//开通会员
                path: 'openingMember',
                name: 'openingMember',
                component: _import('home/openingMember'),
                meta: {
                    title: '开通会员',
                    cache: false
                }
            },
            {//公告
                path: 'announcement',
                component: layout,
                children: [
                    {
                        path: 'index',
                        name: 'announcementIndex',
                        component: _import('home/announcement/index'),
                        meta: {
                            title: '公告',
                            cache: true
                        }
                    },
                    {//消息详情页
                        path: 'detail',
                        name: 'announcementDetail',
                        component: _import('home/announcement/detail'),
                        meta: {
                            title: '公告详情',
                            cache: false
                        }
                    }
                ]
            },
            {
                path:'earnMoney',
                name:'earnMoney',
                component: _import('home/earnMoney'),
                meta: {
                    title: '推荐赚钱',
                    cache: true
                }
            },
            //条款
            {
                path: 'tiaokuan',
                name:'tiaokuan',
                component: _import('home/tiaokuan'),
                meta:{
                    title:'条款',
                    cache: false
                }
            },
            
        ]
    },
    {
        component: _import('404/index'),
        name: '404',
        path: '/404',
        meta: {
            cache: true 
        }
    },
    
    {//个人中心
        path: '/personal',
        component:layouts,
        children: [
            {//用户中心
                path: 'index',
                name: 'personalIndex',
                component: _import('personal/personal'),
                meta: {
                    title: '用户中心',
                    cache: true,
                    has_bottom:true
                }
            },
            {//免费使用
                path: 'freeUse',
                name:'freeUse',
                component: _import('personal/freeUse'),
                meta:{
                    title:'免费使用',
                    cache: true
                }
            },
            {//微信支付页面
                path: 'pay',
                name:'pay',
                component: _import('personal/pay'),
                meta:{
                    title:'微信二维码支付',
                    cache: false
                }
            },
            {//我的推荐页
                path: 'recommend',
                name:'recommend',
                component: _import('personal/recommend'),
                meta:{
                    title:'我的推荐页',
                    cache: false
                }
            },
            {//梦兆
                path: 'dreams',
                name:'dreams',
                component: _import('personal/dreams'),
                meta:{
                    title:'梦兆',
                    cache: false,
                }
            },
            {//商城详情
                path: 'shoppingDetail',
                name:'shoppingDetail',
                component: _import('personal/shoppingDetail'),
                meta:{
                    title:'商城',
                    cache: true,
                }
            },
            {//会员码明细
                path: 'memberDetail',
                name: 'memberDetail',
                component: _import('personal/memberDetail'),
                meta: {
                    title: '会员码明细',
                    cache: true,
                }
            },
            {//我的-卖会员码
                path: 'sell',
                name: 'sell',
                component: _import('personal/sell'),
                meta: {
                    title: '卖会员码',
                    cache: true,
                }
            },
            {//收入明细
                path: 'incomeDetails',
                name: 'incomeDetails',
                component: _import('personal/incomeDetails'),
                meta: {
                    title: '收入明细',
                    cache: true,
                }
            },
            {//提款
                path: 'withdrawals',
                name: 'withdrawals',
                component: _import('personal/withdrawals'),
                meta: {
                    title: '提款',
                    cache: true,
                    has_bottom: false
                }
            },
            {//修改资料
                path: 'modifydata',
                name: 'modifydata',
                component: _import('personal/modifydata'),
                meta: {
                    title: '修改资料',
                    cache: true,
                    has_bottom: false
                }
            },
            {//专家排名奖励
                path: 'expertranking',
                name: 'expertranking',
                component: _import('personal/expertranking'),
                meta: {
                    title: '专家排名奖励',
                    cache: true,
                    has_bottom: false
                }
            },
            {//每日幸运儿
                path: 'lunckson',
                name: 'lunckson',
                component: _import('personal/lunckson'),
                meta: {
                    title: '每日幸运儿',
                    cache: true,
                    has_bottom: false
                }
            },
            {//每日幸运儿-参与规则
                path: 'luckson_rules',
                name: 'luckson_rules',
                component: _import('personal/luckson_rules'),
                meta: {
                    title: '参与规则',
                    cache: true,
                    has_bottom: false
                }
            },
            {//参与规则
                path: 'participaterules',
                name: 'participaterules',
                component: _import('personal/participaterules'),
                meta: {
                    title: '参与规则',
                    cache: true,
                    has_bottom: false
                }
            },
            {//充值
                path: 'topUp',
                name: 'topUp',
                component: _import('personal/topUp'),
                meta: {
                    title: '充值',
                    cache: true,
                    has_bottom: false
                }
            },
            {//我的查看 
                path: 'myview',
                name:'myview',
                component: _import('personal/myview'),
                meta:{
                    title:'我查看的预测',
                    cache: true,
                }
            },
            {//我关注的预测 
                path: 'myfocus',
                name:'myfocus',
                component: _import('personal/myfocus'),
                meta:{
                    title:'我关注的预测',
                    cache: true,
                }
            },
            {//我关注的彩友 
                path: 'mycanyou',
                name:'mycanyou',
                component: _import('personal/mycanyou'),
                meta:{
                    title:'我关注的彩友',
                    cache: true,
                }
            },
            {//专家名称 
                path: 'expertsname',
                name:'expertsname',
                component: _import('personal/expertsname'),
                meta:{
                    title:'专家名称',
                    cache: false,
                }
            },
            {//提交预测 
                path: 'submitPredict',
                name:'submitPredict',
                component: _import('personal/submitPredict'),
                meta:{
                    title:'提交预测',
                    cache: true,
                }
            },
            {//专家推广页 
                path: 'promotionPage',
                name:'promotionPage',
                component: _import('personal/promotionPage'),
                meta:{
                    title:'专家推广页',
                    cache: true,
                }
            },
            {//关于
                path: 'about',
                name:'about',
                component: _import('personal/about'),
                meta:{
                    title:'关于鸿运四码',
                    cache: false
                }
            },
            {//预测规则
                path: 'yucerule',
                name:'yucerule',
                component: _import('personal/yucerule'),
                meta:{
                    title:'预测规则',
                    cache: false
                }
            }
        ]
    },
    {//登录
        path: '/login',
        component: layouts,
        children: [
            {
                path: 'index',
                name: 'loginIndex',
                component: _import('login/index'),
                meta: {
                    title: '登录',
                    cache: true
                }
            },
            {
                path: 'verification',
                name: 'verification',
                component: _import('login/verification'),
                meta: {
                    title: '验证码登录',
                    cache: true
                }
            }
        ]
    },
    {//注册
        path: '/register',
        component: layouts,
        children: [
            {
                path: 'index',
                name: 'registerIndex',
                component: _import('register/index'),
                meta: {
                    title: '注册',
                    cache: false
                }
            }
        ]
    },
    {
        path: '*', redirect: '/404'

    },
]
