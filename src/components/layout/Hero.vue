<template>
  <section class="hero is-info is-bold">

    <!-- Hero Body w/ Vue Transition -->
    <transition name="smooth">
      <div v-if="hideOnHome" class="hero-body">
        <div class="container">
          <h1 class="title is-2 is-uppercase">
            <img class="is-pulled-left" width="45" src="@/assets/img/logo.svg">
            --TITLE--<br>
            <p class="subtitle is-4 is-capitalized">
              Datacenter Management Portal
            </p>
          </h1>
        </div>
      </div>
    </transition>


    <!-- Nav Mega Menu -->
    <div class="navbar-item has-dropdown
      is-mega is-pulled-left" @click="isActive = !isActive"
      :class="{ 'is-hidden': hideOnHome, 'rotate': isActive }"
      v-on-clickaway="away"
    >
      <div class="navbar-link">
        <img src="@/assets/img/logo.svg" alt="TITLE">
        TITLE {{ parent_route }}
      </div>
      <transition
        name="menu"
        enter-active-class="fadeInDown"
        leave-active-class="fadeOutUp">
        <app-navmenu
          :class="{'is-active': isActive}"
          :parent_route="parent_route"
          :routes="routes"
          class="animated"
          v-if="isActive"
        />
      </transition>
    </div>

    <!-- Hero footer -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-small is-right">
        <div class="container">
          <ul>

            <!-- Parent Links -->
            <router-link tag="li" v-for="route in routes"
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
import ParentRoute from '@/mixins/parentRoute'
import HideOnHome from '@/mixins/hideOnHome'
import RouteList from '@/mixins/routeList'
import { mixin as ClickAway } from 'vue-clickaway';
export default {
  components: {
    'app-navmenu': NavMenu
  },
  methods: {
    parentIsActive(parent) {
      return this.$route.matched[0].name == parent
    },
    away: function() {
      this.isActive = false
    }
  },
  mixins: [ParentRoute, HideOnHome, RouteList, ClickAway],
  data() {
    return {
      routes: [],
      isActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
// Vue Transition Styles
.smooth-enter-active, .smooth-leave-active {
  transition: all 0.25s;
  max-height: 175px;
}
.smooth-enter, .smooth-leave-to {
  max-height: 0px;
  padding: 0px;
  opacity: 0;
}

// Animate CSS customizations
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -5%, 0);
    transform: translate3d(0, -10%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
}
@keyframes fadeOutUp {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -5%, 0);
    transform: translate3d(0, -10%, 0);
  }
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
  margin-bottom: -43px;
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

.hero-foot {
  margin-top: 13px;
}
.navbar-item.is-mega.rotate .navbar-link::after {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  margin-top: -0.1rem;
}

// Media customizations
@media screen and (max-width: 1024px) {
  .navbar-item.is-mega {
    max-width: initial;
    margin-bottom: 0;
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
}
</style>
