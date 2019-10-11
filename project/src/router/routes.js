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
                name:'home',
                component: _import('home/shopping'),
                meta:{
                    title:'商城',
                    cache: true,
                    has_bottom:true
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
            {//商城
                path: 'shoppingDetail',
                name:'shoppingDetail',
                component: _import('personal/shoppingDetail'),
                meta:{
                    title:'商城',
                    cache: true
                }
            },
            {
                path: 'memberDetail',
                name: 'memberDetail',
                component: _import('personal/memberDetail'),
                meta: {
                    title: '会员码明细',
                    cache: true
                }
            },
            {
                path: 'incomeDetails',
                name: 'incomeDetails',
                component: _import('personal/incomeDetails'),
                meta: {
                    title: '收入明细',
                    cache: true
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
