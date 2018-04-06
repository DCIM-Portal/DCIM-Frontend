<template>
  <section>

    <!-- Logout button -->
    <span class="navbar-item logout"
      @click.prevent="triggerModal">
      <a class="button is-danger">
        <span class="icon">
          <i class="mdi mdi-18px mdi-logout"></i>
        </span>
        <span>Sign Out</span>
      </a>
    </span>

    <!-- Modal content -->
    <b-modal :active.sync="modalActive" :width="420">
      <logout-modal-content/>
    </b-modal>

  </section>
</template>

<script>
import LogoutModalContent from './modal/LogoutModalContent'
export default {
  components: {
    'logout-modal-content': LogoutModalContent
  },
  methods: {
    triggerModal () {
      this.$store.commit('setError', false)
      this.modalActive = !this.modalActive
    }
  },
  computed: {
    modalActive: {
      get() {
        return this.$store.state.auth.loginModal
      },
      set(value) {
        this.$store.commit('triggerModal', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Logout button
.logout {
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
  .logout {
    padding: 0.65rem 1rem;
  }
}
</style>
