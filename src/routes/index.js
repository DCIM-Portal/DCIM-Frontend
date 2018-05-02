// Home Route Components
import { Home } from '@/components/views/home'

// Catalog Route Components
import { Catalog } from '@/components/views/catalog'

// Documentation Route Components
import { Documentation } from '@/components/views/documentation'

// Admin Route Components
import * as AdminViews from '@/components/views/admin/'

import { APP_TITLE } from '@/common/config'
import VueRouterRoutesBuilder from '@/routes/VueRouterRoutesBuilder'

let routes = new VueRouterRoutesBuilder()
routes.add('', null, APP_TITLE)
routes.add('/', Home, 'Home', 'Home page', {guest: true})
routes.add('/catalog', null, 'Catalog', null, {auth: true})
routes.add('/catalog/', Catalog, 'Catalog', 'Catalog for ordering assets')
routes.add('/documentation', null, 'Documentation', null, {auth: true})
routes.add('/documentation/', Documentation, 'Documentation', 'Docs hub for all documentation')
routes.add('/documentation/admin_docs', null, 'Admin Docs')
routes.add('/admin', null, 'Administration', null, {auth: true})
routes.add('/admin/', AdminViews.Admin, 'Administration', 'DCIM Administrative Section')
routes.add('/admin/scans_and_onboarding', null, 'Scans and Onboarding')
routes.add('/admin/scans_and_onboarding/', AdminViews.ScanOnboard, 'Scans and Onboarding Landing Page')
routes.add('/admin/scans_and_onboarding/scan_requests', AdminViews.ScanRequests, 'Scan Requests', 'Scan IP ranges for hosts')
routes.add('/admin/scans_and_onboarding/credentials', AdminViews.Credentials, 'Credentials', 'Credentials used for scan requests')
routes.add('/admin/scans_and_onboarding/onboard_requests', AdminViews.OnboardRequests, 'Onboard Requests', 'Onboard hosts into backend system')
routes.add('/admin/organization', null, 'Physical Organization')
routes.add('/admin/organization/', AdminViews.Organization, 'Physical Organization')
routes.add('/admin/organization/zones', AdminViews.Zones, 'Zones', 'Create and manage data center zones', {detailComponent: AdminViews.Zone, apiPath: 'zones'})
routes.add('/admin/organization/racks', AdminViews.Racks, 'Racks', 'Manage creation and location of racks')
routes.add('/admin/organization/enclosures', AdminViews.Enclosures, 'Enclosures', 'Create and populate enclosures')
routes.add('/admin/assets', AdminViews.Assets, 'DCIM Assets')
routes.add('/admin/assets/bmc_hosts', AdminViews.BmcHosts, 'BMC Hosts', 'View and manage BMC hosts', {apiPath: 'bmc_hosts'})
routes.add('/admin/assets/systems', AdminViews.Systems, 'Systems', 'Systems onboarded into backend')
routes.add('*', null, null, null, {redirect: '/'})

export default routes.toVueRouterRoutes()

export {
  routes as routesBuilder
}
