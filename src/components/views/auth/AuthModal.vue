<template>
  <section>

    <!-- Login Button -->
    <span class="navbar-item auth"
      @click.prevent="triggerModal"
      v-if="!auth">
      <a class="button is-success has-shadow">
        <span class="icon">
         <i class="mdi mdi-18px mdi-login"></i>
        </span>
        <span>Sign In</span>
      </a>
    </span>

    <!-- Logout button -->
    <span class="navbar-item auth"
      @click.prevent="triggerModal"
      v-if="auth">
      <a class="button is-danger has-shadow">
        <span class="icon">
          <i class="mdi mdi-18px mdi-logout"></i>
        </span>
        <span>Sign Out</span>
      </a>
    </span>

    <!-- Modal content -->
    <b-modal class="auth-modal" :active.sync="modalActive" :width="420">
      <login-modal-content v-if="!auth"/>
      <logout-modal-content v-if="auth"/>
    </b-modal>

  </section>
</template>

<script>
import LoginModalContent from './modal/LoginModalContent'
import LogoutModalContent from './modal/LogoutModalContent'
export default {
  components: {
    'login-modal-content': LoginModalContent,
    'logout-modal-content': LogoutModalContent
  },
  props: ['auth'],
  methods: {
    triggerModal () {
      this.$store.commit('setError', false)
      this.modalActive = !this.modalActive
    }
  },
  computed: {
    modalActive: {
      get() {
        return this.$store.state.auth.authModal
      },
      set(value) {
        this.$store.commit('triggerModal', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Custom auth modal trigger buttons
.auth {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.8rem 1rem;
  z-index: 5;
  .button {
    height: 25px;
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 1024px) {
  .auth {
    padding: 0.65rem 1rem;
  }
}
</style>
