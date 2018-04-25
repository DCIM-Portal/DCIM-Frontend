import { mapGetters } from 'vuex'
import { router } from '@/common/vue-router'
import store from '@/store'
export default {
  computed: {
    ...mapGetters({
      isModalOpen: 'isModalOpen',
      isAuthenticated: 'isAuthenticated'
    })
  },
  created() {
    let isAuth = store.getters.isAuthenticated
    let isModal = store.getters.isModalOpen
    if ((!isAuth && !isModal) && !this.onGuest) {
      store.commit('setNeedAuth', true)
      store.commit('setLostAuth', false)
      store.commit('triggerModal', true)
    }
  },
  watch: {
    isModalOpen: (newVal, oldVal) => {
      if (oldVal && (!newVal && !store.getters.isAuthenticated)) {
        store.commit('setNeedAuth', false)
        store.commit('setLostAuth', false)
        router.replace('/')
      }
    }
  }
}
