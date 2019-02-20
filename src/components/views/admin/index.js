// Main Admin Page
import Admin from './Index.vue'

// Admin Sections
import ScanOnboard from './sections/ScanOnboard'
import Assets from './sections/Asset'
import Organization from './sections/Organization'

// Admin Categories
import Zones from './categories/Zones'
import BmcHosts from './categories/BmcHosts'
import Enclosures from './categories/Enclosures'
import Racks from './categories/Racks'
import Credentials from './categories/Credentials'
import OnboardRequests from './categories/OnboardRequests'
import ScanRequests from './categories/ScanRequests'
import Systems from './categories/Systems'

// Admin Details
import Zone from './details/Zone'

export {
  Admin,
  Zones,
  BmcHosts,
  Systems,
  Enclosures,
  Racks,
  Credentials,
  OnboardRequests,
  ScanRequests,
  ScanOnboard,
  Assets,
  Organization,
  Zone,
}
