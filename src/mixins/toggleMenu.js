export default {
  computed: {
    menuIsActive: {
      get() {
        return this.$store.state.menu.menuIsActive
      },
      set(value) {
        this.$store.commit('setMenuActive', value)
      }
    }
  },
  methods: {
    toggleMenu() {
      this.menuIsActive = !this.menuIsActive
    }
  }
}
