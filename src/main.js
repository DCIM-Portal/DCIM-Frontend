import Vue from 'vue'

// Import common services
import ApiService from '@/common/api.service'
import { router } from '@/common/vue-router'
import '@/common/vuex-router-sync'
import '@/common/buefy'
import '@/common/material-icons'
import '@/common/vue-progressbar'
import '@/common/i18n'
import '@/common/vue-backtotop'

// Import app and vuex store
import App from './App'
import store from './store'

Vue.config.productionTip = false
ApiService.init()
store.dispatch('checkAuth')

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
