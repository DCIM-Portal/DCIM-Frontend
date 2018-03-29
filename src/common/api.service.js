import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },
  setHeader (token) {
    Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    console.log(Vue.axios.defaults.headers.common['Authorization'])
  },
  post (resource, params, options) {
    return Vue.axios.post(`${resource}`, params, options)
  },
  get (resource, options) {
    return Vue.axios.get(`${resource}`, options)
  },
  cancelToken () {
    return Vue.axios.CancelToken.source()
  }
}

export default ApiService
