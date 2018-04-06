<template>
  <div>
    <h1 class="title has-text-weight-light">Login</h1>
    <form
      @submit.prevent="onSubmit(username, password)"
      class="box"
      >

      <div v-if="isLoginWait" class="is-loading"/>

      <b-field label="Username">
        <b-input
          type="text"
          v-model="username"
          placeholder="Username"
          icon="account-box-outline"
          :disabled.sync="isLoginWait"
          required/>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          v-model="password"
          placeholder="●●●●●●●"
          icon="key"
          password-reveal
          :disabled.sync="isLoginWait"
          required/>
      </b-field>

      <hr>

        <b-message
          :active.sync="isLoginError"
          size="is-small"
          title="Login Failed"
          type="is-danger">
          <div
            class="error-message"
            v-if="loginError == 'Timeout'">
            {{ loginTimeout }}
          </div>
          <div class="error-message" v-else>
            Login failed - please try again.
            Response was {{ loginError.status }}: {{ loginError.statusText}}
          </div>
        </b-message>

      <p class="control">
        <button
          class="button is-success"
          type="submit"
          :disabled.sync="isLoginWait">
          Sign In
        </button>
        <button
          class="button is-default is-pulled-right"
          @click.prevent="$parent.close()"
          :disabled.sync="isLoginWait">
          Cancel
        </button>
      </p>

    </form>
  </div>
</template>

<script>
import { LOGIN_TIMEOUT } from '@/common/config'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loginError: 'loginError',
      isLoginWait: 'isLoginWait'
    }),
    isLoginError: {
      get() {
        return this.$store.state.auth.isLoginError
      },
      set(value) {
        this.$store.commit('setError', value)
      }
    }
  },
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
      loginTimeout: LOGIN_TIMEOUT
    }
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  text-align: center;
}
.box {
  background-color: whitesmoke;
  position: relative;
}
.is-loading {
  pointer-events: none;
  opacity: 0.6;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 20;
  top: 0;
  left: 0;
}
.is-loading::after {
  -webkit-animation: spinAround 500ms infinite linear;
  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
  position: absolute;
  top: 4em;
  left: calc(50% - 2.5em);
  width: 5em;
  height: 5em;
  border-width: 0.25em;
}
</style>
