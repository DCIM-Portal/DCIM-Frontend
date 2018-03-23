<template>
  <div id="app">
    <app-hero></app-hero>
    <app-main></app-main>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Hero from '@/components/layout/Hero'
import AppMain from '@/components/layout/AppMain'
export default {
  components: {
    'app-main': AppMain,
    'app-hero': Hero
  },
  name: 'App'
}
</script>

<style lang="scss">
// Animate.css
@import '~animate.css';
.animated {
  animation-duration: 0.55s;
}

// Bulma and Buefy
@import "~bulma";
@import "~buefy/src/scss/buefy";

// Set customized html standard
html {
  background-color: #f5f5f5;
  overflow-y: auto;
}
</style>
