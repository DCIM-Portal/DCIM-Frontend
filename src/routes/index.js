// Home Route Components
import { Home } from '@/components/views/home'

// Passthrough section component
import PassthroughView from '@/components/views/PassthroughView'

// Catalog Route Components
import { Catalog } from '@/components/views/catalog'

// Documentation Route Components
import { Documentation } from '@/components/views/documentation'

// Admin Route Components
import * as AdminViews from '@/components/views/admin/'

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
      info: 'Docs hub for all documentation',
      auth: true
    },
    children: [
      {
        path: 'admin_docs', name: 'Admin Docs'
      }
    ]
  },
  // Admin Routes
  {
    path: '/admin', name: 'Admin', component: AdminViews.Admin,
    meta: {
      section: 'Dashboard',
      info: 'Admin general purpose page',
      auth: true
    },
    // Scans and Onboarding
    children: [
      {
        path: 'scans_and_onboarding', name: 'Scans and Onboarding', component: AdminViews.ScanOnboard,
        children: [
          {
            path: 'scan_requests', component: PassthroughView,
            children: [
              {
                path: '', name: 'Scan Requests', component: AdminViews.ScanRequests,
                meta: {
                  info: 'Scan IP ranges for hosts'
                }
              }
            ]
          },
          {
            path: 'credentials', component: PassthroughView,
            children: [
              {
                path: '', name: 'Credentials', component: AdminViews.Credentials,
                meta: {
                  info: 'Credentials used for scan requests'
                }
              }
            ]
          },
          {
            path: 'onboard_requests', component: PassthroughView,
            children: [
              {
                path: '', name: 'Onboard Requests', component: AdminViews.OnboardRequests,
                meta: {
                  info: 'Onboard hosts into backend system'
                }
              }
            ]
          }
        ]
      },
      // Zones and Racks
      {
        path: 'zones_and_racks', name: 'Zones and Racks', component: AdminViews.ZonesRacks,
        children: [
          {
            path: 'zones', component: PassthroughView,
            children: [
              {
                path: '', name: 'Zones', component: AdminViews.Zones,
                meta: {
                  info: 'Create and manage datacenter zones',
                  apiPath: 'zones'
                }
              },
              {
                path: ':id', name: 'Zone', component: AdminViews.Zone
              }
            ]
          },
          {
            path: 'racks', component: PassthroughView,
            children: [
              {
                path: '', name: 'Racks', component: AdminViews.Racks,
                meta: {
                  info: 'Manage creation and location of racks'
                }
              }
            ]
          },
          {
            path: 'enclosures', component: PassthroughView,
            children: [
              {
                path: '', name: 'Enclosures', component: AdminViews.Enclosures,
                meta: {
                  info: 'Create and populate enclosures'
                }
              }
            ]
          }
        ]
      },
      // Assets
      {
        path: 'assets', name: 'Assets', component: AdminViews.Assets,
        children: [
          {
            path: 'bmc_hosts', component: PassthroughView,
            children: [
              {
                path: '', name: 'BMC Hosts', component: AdminViews.BmcHosts,
                meta: {
                  info: 'View and manage BMC hosts',
                  apiPath: 'bmc_hosts'
                }
              }
            ]
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
