import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import Register from '../components/Register'
import Home from '../components/Home'
import UserPage from '../components/user/UserPage'
import CartPage from '../components/cart/CartPage'
import GamePage from '../components/Games/GamePage'
import Friends from '../components/Frinends/Friends'
import PKhome from '../components/LogicPK/PKhome'
import InnerRoom from '../components/LogicPK/InnerRoom'

import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录界面'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            // requireAuth: true
          }
        },
        {
          path: '/cart',
          name: 'CartPage',
          component: CartPage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user',
          component: UserPage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/game',
          name: 'GamePage',
          component: GamePage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/friends',
          name: 'Friends',
          component: Friends,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/PKhome',
          name: 'PKHome',
          component: PKhome,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/innerroom',
          name: 'InnerRoom',
          component: InnerRoom,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册账号'
      }
    }
  ]
})
