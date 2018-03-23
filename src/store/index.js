import Vue from 'vue'
import Vuex from 'vuex'
import ToggleMenu from './modules/toggleMenu'
import Auth from './modules/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    menu: ToggleMenu,
    auth: Auth
  },
  strict: debug
})

export default store
