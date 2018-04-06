import ApiService from '@/common/api.service'
import { router } from '@/common/vue-router'

const state = {
  authenticated: false,
  loginModal: false,
  isLoginError: false,
  loginError: false,
  isLoginWait: false
}

const getters = {
  isAuthenticated(state) {
    return state.authenticated
  },
  isModalOpen(state) {
    return state.loginModal
  },
  isLoginError(state) {
    return state.isLoginError
  },
  loginError(state) {
    return state.loginError
  },
  isLoginWait(state) {
    return state.isLoginWait
  }
}

const actions = {
  login(context, credentials) {
    context.commit('setLoginWait', true)
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
          }),
          context.commit('triggerModal', false)
          context.commit('setLoginWait', false)
        })
        .catch(error => {
          error.response =
            (error.response === undefined) ? 'Timeout' : error.response
          console.log(error.response)
          context.commit('setError', error.response)
          context.commit('purgeAuth')
          context.commit('setLoginWait', false)
        })
  },
  logout(context) {
    context.commit('purgeAuth')
    console.log(router.app._route.name)
    if (router.app._route.name !== 'Home') {
      router.replace('/')
    }
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
  setError(state, error) {
    state.isLoginError =
      error ? true : false
    state.loginError = error
  },
  setLoginWait(state, value) {
    state.isLoginWait = value
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
