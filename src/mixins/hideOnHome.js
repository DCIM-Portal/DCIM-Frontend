export default {
  computed: {
    hideOnHome() {
      return this.$route.name == "Home"
    }
  }
}
