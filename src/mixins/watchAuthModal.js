import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isModalOpen: 'isModalOpen'
    })
  },
  watch: {
    isModalOpen: (newVal, oldVal) => {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
}
