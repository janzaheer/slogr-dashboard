import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Home from '../components/Home.vue';
import Sentinel from '../components/Sentinel/Sentinel.vue';
import Sessions from '../components/Sessions/Sessions.vue';
import Monitor from '../components/Monitor/Monitor.vue';
import Login from '../components/Auth/Login.vue';
import SignUp from '../components/Auth/SignUp.vue';
import Groups from '../components/Groups/Groups.vue';
import Analytics from '../components/Analytics/Analytics.vue';
import SentinelReports from '../components/Sentinel/SentinelReports.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home2',
      name: 'Home',
      component: Home
    },
    {
      path: '/sentinel',
      name: 'Sentinel',
      component: Sentinel
    },
    {
      path: '/sessions',
      name: 'Sessions',
      component: Sessions
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/sentinelReports',
      name: 'SentinelReports',
      component: SentinelReports
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
