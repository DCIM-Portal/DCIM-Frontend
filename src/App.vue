<template>
  <div id="app">
    <app-hero :onGuest="onGuest"></app-hero>
    <app-main :onGuest="onGuest"></app-main>
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
  name: 'App',
  components: {
    'app-main': AppMain,
    'app-hero': Hero
  },
  computed: {
    onGuest() {
      return this.$route.meta.guest
    }
  }
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
// Style for auth modal (scroll bar on outer)
.auth-modal {
  align-items: inherit;
  overflow: auto;
  background-color: rgba(10, 10, 10, 0.86);
  .modal-background {
    background-color: transparent;
    z-index: 50;
  }
  .modal-content {
    margin-top: 45px;
    overflow: visible;
  }
  .modal-close {
    z-index: 51;
  }
}
// Mobile fixes for auth modal
@media screen and (max-height: 875px) and (min-height: 600px) {
  .auth-modal {
    .modal-content {
      margin-top: 25px;
    }
  }
}
@media screen and (max-height: 600px) {
  .auth-modal {
    .modal-content {
      margin-top: 0;
      padding-bottom: 615px;
    }
  }
}
// Loading bar indicator
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
