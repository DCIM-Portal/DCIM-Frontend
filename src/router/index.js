// Main components
import Vue from 'vue'
import Router from 'vue-router'

// Parent Route Components
import { Home, Catalog, Documentation, Admin } from '@/components/views/'

// Admin Sub Route Components
import { Zones, BmcHosts } from '@/components/views/admin/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name:'Home', component: Home },
    { path: '/catalog', name: 'Catalog', component: Catalog },
    { path: '/documentation', name: 'Documentation', component: Documentation,
      children: [
        { path: 'admin_docs', name: 'Admin Docs'}
      ]
    },
    { path: '/admin', name: 'Admin', component: Admin,
      meta: { title: 'Dashboard', info: 'Admin main general purpose page'},
      children: [
        { path: 'zones', name: 'Zones', component: Zones,
          meta: {
            section: 'Zone and Racks',
            info: 'Manage and create datacenter zones'
          }
        },
        { path: 'bmc_hosts', name: 'BMC Hosts', component: BmcHosts }
      ]
    }
  ],
  mode: 'history'
})
