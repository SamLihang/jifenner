import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/view.vue'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"  
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/ShopHome/view.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/ShopDetail/view.vue')      
    },
    {
      path: '/exchangeResult',
      name: 'exchangeResult',
      component: () => import(/* webpackChunkName: "about" */ './views/ExchangeResult/view.vue')      
    },
    {
      path: '/integralDetail',
      name: 'integralDetail',
      component: () => import(/* webpackChunkName: "about" */ './views//IntegralDetail/view.vue')      
    },
    {
      path: '/share',
      name: 'share',
      component: () => import(/* webpackChunkName: "share") */ './views/share.vue')
    },
    {
      path: '/haibao',
      name: 'haibao',
      component: () => import(/* webpackChunkName: "haibao") */ './views/haibao.vue')
    }
  ]
})
