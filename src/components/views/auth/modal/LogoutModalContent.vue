<template>
  <div>
    <h1 class="title has-text-weight-light">Sign Out</h1>
    <form
      @submit.prevent="onSubmit()"
      class="box"
      >
      <div>Are you sure you want to sign out?</div>
      <hr>
      <p class="control">
        <button
          class="button is-danger"
          type="submit">
          Sign Out
        </button>
        <button
          class="button is-default is-pulled-right"
          @click.prevent="$parent.close()">
          Cancel
        </button>
      </p>

    </form>
    <div class="message-box"/>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      this.$store.dispatch('logout')
      this.$store.commit('triggerModal', false)
    }
  }
}
</script>

<style lang="scss" scoped>
// Give our modal form background an off-white
.box {
  background-color: whitesmoke;
  position: relative;
  border-radius: 3px;
  z-index: 51;
}
// Include message-box to fix Buefy's mobile view
// Also raise z-index of notifications
.message-box {
  min-height: 50px;
  .notification {
    z-index: 51;
  }
}
</style>
