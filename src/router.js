import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login/view.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/ShopHome/view.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/ShopDetail/view.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/exchangeResult',
      name: 'exchangeResult',
      component: () => import(/* webpackChunkName: "about" */ './views/ExchangeResult/view.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/integralDetail',
      name: 'integralDetail',
      component: () => import(/* webpackChunkName: "about" */ './views//IntegralDetail/view.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/share',
      name: 'share',
      component: () => import(/* webpackChunkName: "share") */ './views/share.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/haibao',
      name: 'haibao',
      component: () => import(/* webpackChunkName: "haibao") */ './views/haibao.vue'),
      meta: { title: '建面惠' }
    },
    {
      path: '/flag/home',
      name: "flagHome",
      component: () => import(/* webpackChunkName: 'flaghome' */ './views/flag/home.vue'),
      meta: { title: 'flag当立' }
    },
    {
      path: '/flag/login',
      name: "flagLogin",
      component: () => import(/* webpackChunkName: 'flaglogin' */ './views/flag/login.vue'),
      meta: { title: 'flag当立' }
    },
    {
      path: '/flag/upload',
      name: "flagUpload",
      component: () => import(/* webpackChunkName: 'flagupload' */ './views/flag/upload.vue'),
      meta: { title: 'flag当立' }
    },
    {
      path: '/flag/rank',
      name: "flagRank",
      component: () => import(/* webpackChunkName: 'flagrank' */ './views/flag/rank.vue'),
      meta: { title: 'flag当立' }
    },
    {
      path: '/flag/tiyan',
      name: "flagTiyan",
      component: () => import(/* webpackChunkName: 'flagtiyan' */ './views/flag/tiyan.vue'),
      meta: { title: 'flag当立' }
    },
    {
      path: '/flag/share',
      name: "flagshare",
      component: () => import(/* webpackChunkName: 'flagshare' */ './views/flag/share.vue'),
      meta: { title: 'flag当立' }
    }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
