const translations = {
  en: {
    tables: {
      attributes: {
        power_status: {
          on: 'On',
          off: 'Off'
        },
        sync_status: {
          success: 'Synchronized',
          in_progress: 'In Progress',
          unknown_error: 'Unknown Error',
          stack_trace: 'Stack Trace',
          smart_proxy_error: 'Smart Proxy Error',
          connection_timeout_error: 'Connection Timeout',
          invalid_credentials_error: 'Invalid Credentials',
          invalid_username_error: 'Invalid Username',
          invalid_password_error: 'Invalid Password',
          unsupported_fru_error: 'Unsupported Fru',
          session_timeout_error: 'Session Timeout',
          bmc_busy_error: 'Bmc Busy'
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
