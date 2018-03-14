export default {
  created () {
    this.$router.options.routes.forEach(route => {
      this.routes.push({
        name: route.name,
        path: route.path,
        children: route.children,
        meta: route.meta
      })
    })
  }
}
