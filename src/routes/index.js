// Home Route Components
import { Home } from '@/components/views/home'

// Catalog Route Components
import { Catalog } from '@/components/views/catalog'

// Documentation Route Components
import { Documentation } from '@/components/views/documentation'

// Admin Route Components
import {
  Admin,
  Zones,
  Racks,
  Enclosures,
  BmcHosts,
  ScanRequests,
  Credentials,
  OnboardRequests,
  ScanOnboard,
  Assets,
  ZonesRacks
} from '@/components/views/admin/'

export default [
  // Home
  {
    path: '/', name:'Home', component: Home,
    meta: {
      section: 'Home',
      info: 'Home page',
      guest: true
    }
  },
  // Catalog Routes
  {
    path: '/catalog', name: 'Catalog', component: Catalog,
    meta: {
      section: 'Catalog',
      info: 'Catalog main page',
      auth: true
    }
  },
  // Documentation Routes
  {
    path: '/documentation', name: 'Documentation', component: Documentation,
    meta: {
      section: 'Docs Hub',
      info: 'Docs hub for all documenation',
      auth: true
    },
    children: [
      { path: 'admin_docs', name: 'Admin Docs'}
    ]
  },
  // Admin Routes
  {
    path: '/admin', name: 'Admin', component: Admin,
    meta: {
      section: 'Dashboard',
      info: 'Admin general purpose page',
      auth: true
    },
    // Scans and Onboarding
    children: [
      {
        path: 'scans_and_onboarding', name: 'Scans and Onboarding', component: ScanOnboard,
        children: [
          {
            path: 'scan_requests', name: 'Scan Requests', component: ScanRequests,
            meta: {
              info: 'Scan IP ranges for hosts'
            }
          },
          {
            path: 'credentials', name: 'Credentials', component: Credentials,
            meta: {
              info: 'Credentials used for scan requests'
            }
          },
          {
            path: 'onboard_requests', name: 'Onboard Requests', component: OnboardRequests,
            meta: {
              info: 'Onboard hosts into backend system'
            }
          }
        ]
      },
      // Zones and Racks
      {
        path: 'zones_and_racks', name: 'Zones and Racks', component: ZonesRacks,
        children: [
          {
            path: 'zones', name: 'Zones', component: Zones,
            meta:  {
              info: 'Create and manage datacenter zones',
              apiPath: 'zones'
            }
          },
          {
            path: 'racks', name: 'Racks', component: Racks,
            meta: {
              info: 'Manage creation and location of racks'
            }
          },
          {
            path: 'enclosures', name: 'Enclosures', component: Enclosures,
            meta: {
              info: 'Create and populate enclosures'
            }
          }
        ]
      },
      // Assets
      {
        path: 'assets', name: 'Assets', component: Assets,
        children: [
          {
            path: 'bmc_hosts', name: 'BMC Hosts', component: BmcHosts,
            meta: {
              info: 'View and manage BMC hosts',
              apiPath: 'bmc_hosts'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/*',
    meta: {},
    redirect: '/',
  }
]
