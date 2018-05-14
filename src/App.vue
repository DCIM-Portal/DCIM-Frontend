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
  $orange: #e67e22;
  $yellow: #f1b70e;
  $green: #41b883;
  $turquoise: #1abc9c;
  $blue: #3498db;
  $purple: #8e44ad;
  $red: #ff6a6a;
  $white-ter: #ecf0f1;
  $primary: #375a7f !default;
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  // Roboto Font
  @import "./assets/css/font";
  // Vue Multiselect
  @import "vue-multiselect/dist/vue-multiselect.min.css";
  // Custom table css
  @import "./assets/css/table";
  // Overrides
  html {
    background-color: #f5f5f5;
    overflow-y: auto;
  }
  html, body, button, input, select, textarea {
    font-family: $roboto-condensed;
    height: 100%;
  }
  :focus {
    outline: none;
  }
  .box {
    background: whitesmoke;
    border-radius: 2px;
  }
  .title {
    font-weight: 300;
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
  // Custom classes
  .has-shadow {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  .is-grey {
    background-color: #efefef;
    font-weight: 400;
    border-color: transparent;
    color: #35495e;
  }
  .button.is-grey:active {
    border-color: transparent;
    color: #35495e;
  }
  .button.is-grey:hover {
    border-color: transparent;
    color: #35495e;
    background-color: #eaeaea;
  }
  .button.is-pressed {
    border-color: transparent;
    color: #35495e;
    box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.12) !important;
    background-color: #e2e2e2;
  }
  .is-centered {
    align-self: center;
  }
  .push-down {
    margin-top: 1em;
  }
  .flex-is-right {
    margin-left: auto;
  }
</style>
