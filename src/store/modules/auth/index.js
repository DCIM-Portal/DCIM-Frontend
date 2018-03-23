import ApiService from '@/common/api.service'
import { router } from '@/common/vue-router'

const state = {
  authenticated: false,
  loginModal: false
}

const getters = {
  isAuthenticated(state) {
    return state.authenticated
  },
  isModalOpen(state) {
    return state.loginModal
  }
}

const actions = {
  login(context, credentials) {
    const refresh_token = localStorage.getItem('refresh')
    if (refresh_token) {
      credentials = { 'refresh_token': refresh_token }
    }
    ApiService
      .post('auth/user_token', {auth: credentials})
        .then(res => {
          context.commit('setAuth', {
            id_token: res.data.jwt,
            refresh_token: res.data.refresh_token
          })
        })
        .catch(error => {
          console.log(error)
        })
  },
  logout(context) {
    context.commit('purgeAuth')
    router.replace('/')
  },
  checkAuth(context) {
    context.commit('setHeader')
  }
}

const mutations = {
  // When Loggin in, send server response to browser localStorage,
  // set vuex authenticated state to true, and set auth header
  setAuth(state, userData) {
    state.authenticated = true
    localStorage.setItem('id_token', userData.id_token)
    if (userData.refresh_token) {
      localStorage.setItem('refresh', userData.refresh_token)
    }
    ApiService
      .setHeader(userData.id_token)
  },
  triggerModal(state, value) {
    state.loginModal = value
  },
  // Ensure user is still authenticated
  setHeader(state) {
    const id_token = localStorage.getItem('id_token')
    state.authenticated = !!id_token
    if (state.authenticated) {
      ApiService
        .setHeader(localStorage.getItem('id_token'))
    }
  },
  purgeAuth(state) {
    state.authenticated = false
    localStorage.removeItem('id_token')
    localStorage.removeItem('refresh')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
