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
@import '~animate.css';
.animated {
  animation-duration: .177s;
}
@import '~bulma';
html {
  background-color: #f5f5f5;
  overflow-y: auto;
}
</style>
