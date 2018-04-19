import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/common/config'
import store from '@/store'
import qs from 'qs'

const auth = axios.create()
const instance = axios.create()

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
    Vue.axios.defaults.paramsSerializer = (params) => qs.stringify(params, {encode: false})
  },
  setHeader (token) {
    Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  post (resource, params, options) {
    return instance.post(`${resource}`, params, options)
  },
  get (resource, options) {
    return instance.get(`${resource}`, options)
  },
  cancelToken () {
    return Vue.axios.CancelToken.source()
  },
  authPost (resource, params, options) {
    return auth.post(`${resource}`, params, options)
  }
}

// Interceptor for 'instance':  if we get a failed api request,
// attempt to re-authenticate with a refresh token and update
// pending API requests with new auth header
let isRefreshing = false
let refreshSubscribers = []

instance.interceptors.response.use(response => {
  return response
}, error => {
  const { config, response: { status } } = error
  const originalRequest = config
  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true
      const credentials = { 'refresh_token': localStorage.getItem('refresh') }
      ApiService
        .authPost('auth/user_token', {auth: credentials})
          .then(res => {
            store.commit('setAuth', {
              id_token: res.data.jwt,
              refresh_token: res.data.refresh_token
            }),
            onRefreshed(localStorage.getItem('id_token'))
            isRefreshing = false
          })
          .catch(error => {
            store.commit('purgeAuth')
            store.commit('setLostAuth', true)
            store.commit('triggerModal', true)
          })
    }
    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh(token => {
        // Update request header with updated JWT
        originalRequest.headers['Authorization'] = 'Bearer ' + token
        resolve(axios(originalRequest))
      })
    })
    return retryOrigReq;
  } else {
    return Promise.reject(error);
  }
})

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}

export default ApiService
