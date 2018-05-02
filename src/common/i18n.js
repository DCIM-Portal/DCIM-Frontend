const translations = {
  en: {
    tables: {
      attributes: {
        power_status: {
          'null': 'N/A',
          on: 'On',
          off: 'Off'
        },
        sync_status: {
          success: 'Synchronized',
          in_progress: 'In Progress',
          unknown_error: 'Unknown Error',
          stack_trace: 'Error: Other (stack trace)',
          smart_proxy_error: 'Smart Proxy Error',
          smart_proxy_error: 'Error: Smart Proxy',
          connection_timeout_error: 'Error: Connection timeout',
          invalid_credentials_error: 'Error: Invalid credentials',
          invalid_username_error: 'Error: Invalid username',
          invalid_password_error: 'Error: Invalid password',
          unsupported_fru_error: 'Error: Unsupported FRU',
          session_timeout_error: 'Error: Session timeout',
          bmc_busy_error: 'Error: BMC busy'
        },
        onboard_status: {
          success: 'Complete',
          in_progress: 'In Progress',
          stack_trace: 'Error (stack trace)',
          timeout: 'Timeout'
        },
        onboard_step: {
          'null': 'Preparing to start',
          complete: 'Finished',
          shutdown: 'Shut down',
          power_off: 'Power off',
          pxe: 'PXE boot',
          discover: 'Discover',
          manage: 'Promote to managed',
          bmc_creds: 'Save BMC login',
        }
      },
      application: {
        id: 'ID',
        ip_address: 'IP Address',
        brand: 'Brand',
        product: 'Product',
        serial: 'Serial',
        zone_id: 'Zone ID',
        power_status: 'Power Status',
        sync_status: 'Sync Status',
        onboard_status: 'Onboard Status',
        onboard_step: 'Onboard Step'
      },
      bmc_hosts: {
        ip_address: 'BMC Address',
        updated_at: 'Sync Time',
      },
      zones: {
        name: 'Zone Name',
        foreman_location_id: 'Foreman Zone ID',
        created_at: 'Date Added'
      }
    }
  }
}

import Vue from 'vue'
import vuexI18n from 'vuex-i18n'
import store from '@/store'

Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('en', translations.en)
Vue.i18n.set('en')
