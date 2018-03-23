<template>
  <div>
    <h1 class="title has-text-weight-light">Login</h1>
    <form @submit.prevent="onSubmit(username, password)" class="box">
      <label class="label">Username</label>
      <p class="control has-icon has-icon-right">
        <input class="input" type="text" v-model="username" placeholder="Username" required/>
        <span class="icon is-small">
          <i class="fas fa-user"></i>
        </span>
      </p>
      <label class="label">Password</label>
      <p class="control has-icon has-icon-right">
        <input class="input" type="password" v-model="password" placeholder="●●●●●●●" required/>
        <span class="icon is-small">
          <i class="fas fa-unlock-alt"></i>
        </span>
      </p>
      <hr>
      <p class="control">
        <button class="button is-success" type="submit">Sign In</button>
        <button class="button is-default is-pulled-right" @click.prevent="$parent.close()">Cancel</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit(username, password) {
      this.$store
        .dispatch('login', { username, password })
    }
  },
  data () {
    return {
      username: '',
      password: '',
    }
  }
}
</script>

<style lang="scss" scoped>
p.control {
  margin-bottom: 1rem;
}
</style>
