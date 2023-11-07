import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页可默认加载
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'

// 异步懒加载改造
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

// router bug 占位
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e) => {})
}
// router bug 占位

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      // 为了进首页显示home
      // 重定向给home
      redirect: '/home',
      // 二级路由
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/search', component: Search },
    { path: '/searchList', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 配置全局前置路由守卫, 防止使用url访问不该访问页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 非权限页面, 直接放行
  if (!authUrls.includes(to.path)) {
    next() // 放行
    return
  }
  const token = store.getters.token
  if (token) {
    next() // token存在, 放行
  } else {
    next('login') // token不存在, 重定向给login
  }
})

export default router
