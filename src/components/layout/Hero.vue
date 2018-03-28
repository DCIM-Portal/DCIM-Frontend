<template>
  <section class="hero is-info is-bold">

    <!-- Login Modal -->
    <app-login-modal v-if="!auth"/>

    <!-- Logout button -->
    <span class="navbar-item logout" @click.prevent="logout"
      v-if="auth">
      <a class="button is-danger">
        <span class="icon">
          <lock-close/>
        </span>
        <span>Sign Out</span>
      </a>
    </span>

    <!-- Hero Header -->
    <transition
      mode="out-in"
      enter-active-class="fadeInLeft"
      leave-active-class="fadeOut"
      appear>
      <div v-if="!onHome" class="hero-head animated">
        <nav class="navbar">

          <!-- Nav Menu Button -->
          <div class="navbar-item has-dropdown is-mega"
            :class="{
              'is-hidden': onHome,
              'rotate': menuIsActive
            }"
            v-on-clickaway="away">
            <div class="navbar-link" @click="toggleMenu">
              <img src="@/assets/img/logo.svg">
              {{ title }} {{ parent_route }}
            </div>

            <!-- Nav Menu Contents -->
            <transition
              name="menu"
              enter-active-class="fadeInDown"
              leave-active-class="fadeOutUp">
              <app-navmenu
                :class="{'is-active': menuIsActive}"
                :parent_route="parent_route"
                :routes="routes"
                class="animated"
                v-if="menuIsActive"
              />
            </transition>
          </div>

        </nav>
      </div>
    </transition>

    <!-- Hero Body -->
    <transition name="smooth">
      <div v-if="onHome" class="hero-body">
        <div class="container">
          <h1 class="title is-2 is-uppercase">
            <img class="is-pulled-left" width="45" src="@/assets/img/logo.svg">
            {{ title }}<br>
            <p class="subtitle is-4 is-capitalized">
              Datacenter Management Portal
            </p>
          </h1>
        </div>
      </div>
    </transition>

    <!-- Hero footer -->
    <div class="hero-foot" v-if="auth">
      <nav class="tabs is-boxed is-small">
        <div :class="{'container': onHome}">
          <ul>

            <!-- Parent Links -->
            <router-link tag="li" v-for="route in filterRoutes"
              :to="route"
              :key="route.name"
              :class="{'router-link-active': parentIsActive(route.name)}"
            exact>
              <a>{{ route.name }}</a>
            </router-link>

          </ul>
        </div>
      </nav>
    </div>

  </section>
</template>

<script>
import NavMenu from '@/components/layout/NavMenu'
import LoginModal from '@/components/views/auth/LoginModal'
import { ParentRoute, RouteList, ToggleMenu, OnHome, Auth } from '@/mixins'
import { mixin as ClickAway } from 'vue-clickaway';
import { APP_TITLE } from '@/common/config'
export default {
  components: {
    'app-navmenu': NavMenu,
    'app-login-modal': LoginModal
  },
  methods: {
    parentIsActive(parent) {
      return this.$route.matched[0].name == parent
    },
    away: function() {
      if (this.menuIsActive) {
        this.menuIsActive = false
      }
    },
    logout() {
      this.$store.dispatch('logout');
    }
  },
  mixins: [
    ParentRoute,
    OnHome,
    RouteList,
    ClickAway,
    ToggleMenu,
    Auth
  ],
  data() {
    return {
      routes: [],
      title: APP_TITLE
    }
  },
  computed: {
    filterRoutes: function() {
      return this.routes.filter(function(route) {
        if (route.name !== 'Login') {
          return route
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/custom_animate';
// Vue Transition Styles
.smooth-enter-active, .smooth-leave-active {
  transition: all 0.45s;
  max-height: 175px;
}
.smooth-enter, .smooth-leave-to {
  max-height: 0;
  padding-bottom: 0;
  padding-top: 0;
  opacity: 0;
}
.smooth-enter-to {
  padding: 3rem 1.5rem;
}

// Custom Hero Styling
.hero.is-info.is-bold {
  background-image:
    linear-gradient(140deg, #243b42 50%, #456c86 100%);
  position: relative;
}

// Custom Tabs Styling
.hero.is-info {
  .tabs li.router-link-active {
    background-color: #f5f5f5;
    border-radius: 3px 3px 0 0;
    a {
      background-color: #f5f5f5;
      border-color: #f5f5f5;
      color: #456c86;
    }
    a:hover {
      background-color: #f5f5f5;
      border-color: #f5f5f5;
      color: #456c86;
    }
  }
}

// Mega Menu Styling
.navbar-item.is-mega {
  transition: all 0.25s;
  position: static;
  max-width: 285px;
  z-index: 2;
  .is-active {
    display: block;
  }
  .navbar-link:hover {
    background-color: transparent;
    cursor: default;
  }
  .navbar-item.has-dropdown.is-mega:hover .navbar-link {
    background-color: transparent;
  }
}
.navbar-item.is-mega:hover {
  background-color: transparent;
}
.navbar-item.has-dropdown:hover .navbar-link {
  background-color: transparent;
  color: white;
}
.navbar-link {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.navbar-link::after {
  transition: all 0.25s;
}

.navbar-item.is-mega.rotate .navbar-link::after {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  margin-top: -0.1rem;
}

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

// Media customizations
@media screen and (max-width: 1024px) {
  .navbar-item.is-mega {
    max-width: initial;
    margin-bottom: 0;
    font-size: 0.9rem;
  }
  .navbar-link::after {
    border: 1px solid #3273dc;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: block;
    height: 0.5em;
    pointer-events: none;
    position: relative;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    width: 0.5em;
    margin-top: -0.3em;
    margin-left: 0.9rem;
    top: 50%;
  }
  .logout {
    padding: 0.65rem 1rem;
  }
}

// For bigger screens
@media screen and (min-width: 2160px) {
  .container {
    max-width: 2000px;
    width: 2000px;
  }
}
</style>
