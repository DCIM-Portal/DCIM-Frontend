export default {
  computed: {
    //hideIt() {
    //  return (this.$route.name == "Home") ||
    //    (this.$route.name == "Login")
    //},
    onHome () {
      return this.$route.name == "Home"
    }
  }
}
