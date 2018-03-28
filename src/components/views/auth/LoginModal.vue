<template>
  <section>

    <!-- Login Button -->
    <span class="navbar-item login"
      @click.prevent="triggerModal">
      <a class="button is-success">
        <span class="icon">
          <lock-open/>
        </span>
        <span>Sign In</span>
      </a>
    </span>

    <!-- Modal content -->
    <b-modal :active.sync="modalActive">
      <modal-content/>
    </b-modal>

  </section>
</template>

<script>
import ModalContent from './modal/ModalContent'
export default {
  components: {
    'modal-content': ModalContent
  },
  methods: {
    triggerModal () {
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
.login {
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
  .login {
    padding: 0.65rem 1rem;
  }
}
</style>
