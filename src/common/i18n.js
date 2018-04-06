const translations = {
  en: {
    tables: {
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
