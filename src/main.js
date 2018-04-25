import Vue from 'vue'

// Import common services
import ApiService from '@/common/api.service'
import { router } from '@/common/vue-router'
import { routesBuilder } from '@/routes'
import '@/common/vuex-router-sync'
import '@/common/buefy'
import '@/common/material-icons'
import '@/common/vue-progressbar'
import '@/common/i18n'
import '@/common/vue-backtotop'
import '@/common/visual_dc'

// Import app and vuex store
import App from './App'
import store from './store'

Vue.config.productionTip = false
ApiService.init()
store.dispatch('checkAuth')

router.afterEach((to, from) => {
  let ancestry = routesBuilder.getFlatAncestryOfPath(to.matched[0].path)
  let title = ancestry.map((item) => item.title)
  store.commit('setPageTitle', title)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
