<template>
  <section class="hero is-info is-bold">

    <!-- Auth Modal -->
    <app-auth-modal :auth.sync="auth"/>

    <!-- Hero Header -->
    <transition
      mode="out-in"
      enter-active-class="fadeInLeft"
      leave-active-class="fadeOut"
      appear>
      <div v-if="!onGuest" class="hero-head animated">
        <nav class="navbar">

          <!-- Nav Menu Button -->
          <div class="navbar-item has-dropdown is-mega"
            v-if="auth"
            :class="{
              'is-hidden': onGuest,
              'rotate': menuIsActive
            }"
            v-on-clickaway="away">
            <div class="navbar-link" @click="toggleMenu">
              <img src="@/assets/img/logo.svg">
              {{ title }} {{ parentRouteTitle }}
            </div>

            <!-- Nav Menu Contents -->
            <transition
              name="menu"
              enter-active-class="fadeInDown"
              leave-active-class="fadeOutUp">
              <app-navmenu
                :class="{'is-active': menuIsActive}"
                :parent-route-title="parentRouteTitle"
                :routes-builder="routesBuilder"
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
      <div v-if="onGuest" class="hero-body">
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
        <div :class="{'container': onGuest}">
          <ul>

            <!-- Parent Links -->
            <router-link tag="li" v-for="route in parentRoutes"
              v-if="route.title"
              :to="route"
              :key="route.title"
              :class="{'router-link-active': route.title === parentRouteTitle}"
              exact>
              <a>{{ route.title }}</a>
            </router-link>

          </ul>
        </div>
      </nav>
    </div>

  </section>
</template>

<script>
import NavMenu from '@/components/layout/NavMenu'
import AuthModal from '@/components/views/auth/AuthModal'
import { ToggleMenu, Auth } from '@/mixins'
import { routesBuilder } from '@/routes'
import { mixin as ClickAway } from 'vue-clickaway';
import { APP_TITLE } from '@/common/config'
export default {
  components: {
    'app-navmenu': NavMenu,
    'app-auth-modal': AuthModal
  },
  methods: {
    away: function() {
      if (this.menuIsActive) {
        this.menuIsActive = false
      }
    }
  },
  mixins: [
    ClickAway,
    ToggleMenu,
    Auth
  ],
  props: ['onGuest'],
  data() {
    return {
      routesBuilder: routesBuilder,
      parentRoutes: routesBuilder.getParentRoutes(),
      title: APP_TITLE
    }
  },
  computed: {
    parentRouteTitle() {
      return routesBuilder.getParentRouteFromPath(this.$route.matched[0].path).title
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
.navbar, .navbar-menu, .navbar-start, .navbar-end {
  display: flex;
}
.navbar-item.is-mega {
  transition: all 0.25s;
  position: static;
  max-width: 285px;
  z-index: 5;
  .is-active {
    display: block;
    border-radius: 2px;
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
}
.navbar-link:not(.is-arrowless)::after {
  border: 2px solid #3273dc;
  border-right: 0;
  border-top: 0;
  content: " ";
  display: block;
  height: 0.5em;
  pointer-events: none;
  position: relative;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 35% 75%;
  transform-origin: 35% 75%;
  width: 0.5em;
  margin-left: 0.5rem;
  right: 0;
  top: 0;
}
// Media customizations
@media screen and (max-width: 1024px) {
  .navbar-item.is-mega {
    max-width: 100%;
    margin-bottom: 0;
    font-size: 0.9rem;
  }
}
@media screen and (min-width: 1024px) {
  .navbar-dropdown {
    background-color: white;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 2px solid #dbdbdb;
    -webkit-box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
    display: none;
    font-size: 0.875rem;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: 20;
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
