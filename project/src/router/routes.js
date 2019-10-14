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
            {//过滤 
                path: 'filter',
                name:'filter',
                component: _import('home/filter'),
                meta:{
                    title:'过滤',
                    cache: true,
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
            {//梦兆
                path: 'dreams',
                name:'dreams',
                component: _import('personal/dreams'),
                meta:{
                    title:'梦兆',
                    cache: true,
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
            {//我的查看 
                path: 'myview',
                name:'myview',
                component: _import('personal/myview'),
                meta:{
                    title:'我的查看',
                    cache: true,
                }
            },
            {//我的关注 
                path: 'myfocus',
                name:'myfocus',
                component: _import('personal/myfocus'),
                meta:{
                    title:'我的关注',
                    cache: true,
                }
            },
            {//专家名称 
                path: 'expertsname',
                name:'expertsname',
                component: _import('personal/expertsname'),
                meta:{
                    title:'专家名称',
                    cache: true,
                }
            },
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
