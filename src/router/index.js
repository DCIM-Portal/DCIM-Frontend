import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Admin from '@/components/views/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ],
  mode: 'history'
})
