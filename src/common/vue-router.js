import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    //If user is not authenticated, redirect to login page
    // next({
    //   name: 'Login'
    // })
    console.log("auth")
    store.commit('triggerModal', true)
    next()
    // store.watch((state) => {
    //   console.log(state.auth.loginModal)
    //   console.log(state.auth.authenticated)
    //   if (state.auth.loginModal && !state.auth.authenticated) {
    //     console.log('NEXT')
    //     next()
    //   }
    //   else if (!state.auth.loginModal && !state.auth.authenticated) {
    //     next({name: 'Home'})
    //   }
    // })
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    console.log("guest")
    next({
      name: 'Home'
    })
  } else {
    console.log("next")
    next()
  }
})

Vue.router = router

export default {
  router
}
