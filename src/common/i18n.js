const translations = {
  en: {
    tables: {
      application: {
        id: 'ID',
        brand: 'Brand',
        product: 'Product',
        serial: 'Serial'
      },
      bmc_hosts: {
        brand: 'Brand (overridden)'
      }
    }
  }
}

//

import Vue from 'vue'
import vuexI18n from 'vuex-i18n'
import store from '@/store'

Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('en', translations.en)
Vue.i18n.set('en')
