import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/pages/login'

import tradeChannel from '@/pages/system/trade/trade'
//策略
import index from '@/pages/index/index'
//设置
import index2 from '@/pages/index2/index2'
//新策略
import index3 from '@/pages/index3/index3'
//策略
import index4 from '@/components/sameTable'
//策略
import index5 from '@/components/sameTable'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path: '/tradeChannel',
      meta: {
        title: '交易账号',
        requireAuth: true
      },
      component: tradeChannel
    },
    {
      path: '/index',
      meta: {
        title: '策略交易',
        requireAuth: true
      },
      component: index
    },
    {
      path: '/index2',
      meta: {
        title: '设置',
        requireAuth: true
      },
      component: index2
    },
    {
      path: '/index3',
      meta: {
        title: '新策略',
        requireAuth: true
      },
      component: index3
    },
    {
      path: '/index4',
      meta: {
        title: '委托查询',
        requireAuth: true
      },
      component: index4
    },
    {
      path: '/index5',
      meta: {
        title: '成交查询',
        requireAuth: true
      },
      component: index5
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  window.scrollTo(0, 0);
  var userName = localStorage.getItem("remenberUsername");
  var token = localStorage.getItem("token");
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    if (token) {
      if (to.path == '/login' || to.path == '/signup') {
        window.document.title = "首页";
        next({ path: '/' })
      } else {
        next();
      }
    } else {
      next();
    }
  }
  next();
})

export default router;