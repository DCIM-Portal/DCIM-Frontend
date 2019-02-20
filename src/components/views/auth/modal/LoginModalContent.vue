<template>
  <div>

    <h1 class="title has-text-weight-light">Sign In</h1>


    <form
      @submit.prevent="onSubmit(username, password)"
      class="box">

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

      <hr/>

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

    <div class="message-box">
      <b-notification
        :active.sync="needAuth"
        type="is-info"
        has-icon>
        This page requires authentication.  Please login.
      </b-notification>

      <b-notification
        :active.sync="lostAuth"
        type="is-warning"
        has-icon>
        It appears you are no longer authenticated.  Please login.
      </b-notification>

      <b-notification
        :active.sync="isLoginError"
        has-icon
        type="is-danger">
        <div v-if="loginError == 'Timeout'">
          {{ loginTimeout }}
        </div>
        <div v-else>
          Login failed - please try again.&nbsp;
          Response was {{ loginError.status }}: {{ loginError.statusText}}
        </div>
      </b-notification>
    </div>

  </div>
</template>

<script>
import { LOGIN_TIMEOUT } from '@/common/config'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      loginError: 'loginError',
      isLoginWait: 'isLoginWait',
    }),
    isLoginError: {
      get() {
        return this.$store.state.auth.isLoginError
      },
      set(value) {
        this.$store.commit('setError', value)
      }
    },
    needAuth: {
      get() {
        return this.$store.state.auth.needAuth
      },
      set(value) {
        this.$store.commit('setNeedAuth', value)
      }
    },
    lostAuth: {
      get() {
        return this.$store.state.auth.lostAuth
      },
      set(value) {
        this.$store.commit('setLostAuth', value)
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
// Give our modal form background an off-white
// and raise z-index above modal background
.box {
  background-color: whitesmoke;
  position: relative;
  border-radius: 3px;
  z-index: 51;
}
// Custom message-box for modal messages
// Raise z-index of notifications
.message-box {
  max-width: 420px;
  max-height: 200px;
  height: 200px;
  display: table-cell;
  padding-bottom: 20px;
  transition: all 0.25s;
  .notification {
    padding: 0.8rem 2.3rem 0.8rem 0.8rem;
    font-size: 1rem;
    font-weight: 300;
    z-index: 51;
  }
}
// A loading overlay for modal form
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
