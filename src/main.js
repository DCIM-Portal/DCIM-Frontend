import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

Vue.use(VueProgressBar, {
  color: 'rgb(32, 156, 238)',
  failedColor: 'red',
  height: '2px'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
