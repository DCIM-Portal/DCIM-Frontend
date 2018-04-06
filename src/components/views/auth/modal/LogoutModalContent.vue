<template>
  <div>
    <h1 class="title has-text-weight-light">Logout</h1>
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
.box {
  background-color: whitesmoke;
}
</style>
