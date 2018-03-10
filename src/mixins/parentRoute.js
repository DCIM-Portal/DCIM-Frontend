export default {
  computed: {
    parent_route () {
      return this.$route.matched[0].name
    }
  }
}
