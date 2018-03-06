import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Admin from '@/components/views/Admin'
import Catalog from '@/components/views/Catalog'
import Documentation from '@/components/views/Documentation'

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
      component: Admin,
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: Documentation
    }
  ],
  mode: 'history'
})
