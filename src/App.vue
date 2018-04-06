<template>
  <div id="app">
    <app-hero></app-hero>
    <app-main></app-main>
    <vue-progress-bar></vue-progress-bar>
    <back-to-top bottom="25px" right="10px">
      <a class="button">
        <span class="icon">
          <i class="mdi mdi-24px mdi-chevron-double-up"></i>
        </span>
      </a>
    </back-to-top>
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
.vue-back-to-top {
  a.button {
    height: 40px;
    width: 40px;
    padding: 0rem 0.2rem;
    color: white;
    background: rgba(61, 96, 117, 0.85);
  }
}
</style>
