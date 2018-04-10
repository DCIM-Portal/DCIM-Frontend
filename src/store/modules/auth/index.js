import ApiService from '@/common/api.service'
import { router } from '@/common/vue-router'

const state = {
  authenticated: false,
  authModal: false,
  isLoginError: false,
  loginError: false,
  isLoginWait: false,
  needAuth: false,
  lostAuth: false
}

const getters = {
  isAuthenticated(state) {
    return state.authenticated
  },
  isModalOpen(state) {
    return state.authModal
  },
  isLoginError(state) {
    return state.isLoginError
  },
  loginError(state) {
    return state.loginError
  },
  isLoginWait(state) {
    return state.isLoginWait
  },
  needAuth (state) {
    return state.needAuth
  },
  lostAuth (state) {
    return state.lostAuth
  }
}

const actions = {
  login(context, credentials) {
    context.commit('setLoginWait', true)
    ApiService
      .authPost('auth/user_token', {auth: credentials})
        .then(res => {
          context.commit('setAuth', {
            id_token: res.data.jwt,
            refresh_token: res.data.refresh_token
          }),
          context.commit('triggerModal', false)
          context.commit('setLoginWait', false)
          context.commit('setNeedAuth', false)
          context.commit('setLostAuth', false)
        })
        .catch(error => {
          context.commit('purgeAuth')
          if (state.authModal) {
            error.response =
              (error.response === undefined) ? 'Timeout' : error.response
            context.commit('setError', error.response)
            context.commit('setLoginWait', false)
          } //else if (!state.authModal) {
          //   console.log('STORE MODAL WILL OPEN')
          //   context.commit('setLoginWait', false)
          //   context.commit('setLostAuth', true)
          //   context.commit('triggerModal', true)
          // }
        })
  },
  logout(context) {
    context.commit('purgeAuth')
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
    state.authModal = value
  },
  // Ensure user keeps JWT on page refresh
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
  setLostAuth(state, value) {
    state.lostAuth = value
  },
  setLoginWait(state, value) {
    state.isLoginWait = value
  },
  setNeedAuth(state, value) {
    state.needAuth = value
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
