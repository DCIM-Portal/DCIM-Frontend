import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.router = router

export default {
  router
}
