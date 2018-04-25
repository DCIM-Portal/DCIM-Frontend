<template>
  <nav v-if="!onGuest" class="level app-levelbar">
    <div class="level-left">
      <div class="level-item">
        <h3 class="subtitle is-5">
          {{ name }}
        </h3>
      </div>
    </div>

    <div class="level-right is-hidden-mobile">
      <breadcrumb :list="pathAncestry"></breadcrumb>
    </div>
  </nav>
</template>

<script>
import Breadcrumb from 'vue-bulma-breadcrumb'
import { routesBuilder } from "@/routes";

export default {
  components: {
    Breadcrumb
  },
  props: ['onGuest'],
  data () {
    return {
      list: null
    }
  },
  created () {
    this.getList()
  },
  computed: {
    name () {
      return this.$route.name
    },
    pathAncestry() {
      console.log(this.$route)
      let ancestry = routesBuilder.getFlatAncestryOfPath(this.$route.matched[0].path)
      ancestry.forEach((route, index, original) => {
        if (original[index].title)
          original[index].name = original[index].title
        else if (index === original.length - 1)
          original[index].name = this.name
        original[index].path += '/'
      })
      console.log(ancestry)
      return ancestry
    }
  },
  methods: {
    getList () {
    }
  }
}
</script>

<style lang="scss">
// Fix breadcrumb spacing (also set font-size/weight)
.breadcrumb {
  font-size: 0.9rem;
  font-weight: 400;
  a {
    padding: 0;
  }
}
</style>
