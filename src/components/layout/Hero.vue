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
    is-hoverable is-mega is-pulled-left"
    :class="{ 'is-hidden': hideOnHome }" >
      <div class="navbar-link">
        <img src="@/assets/img/logo.svg" alt="SDCG Management Portal">
        --TITLE-- {{ parent_route }}
      </div>
      <app-navmenu :parent_route="parent_route" :routes="routes"></app-navmenu>
    </div>

    <!-- Hero footer -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-small is-right"
        :class="{ 'push-down': !hideOnHome }"
      >
        <div class="container">
          <ul>

            <!-- Parent Links -->
            <router-link tag="li" v-for="route in routes"
              :to="route.path"
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
export default {
  components: {
    'app-navmenu': NavMenu
  },
  methods: {
    parentIsActive(parent) {
      return this.$route.matched[0].name == parent
    }
  },
  mixins: [ParentRoute, HideOnHome],
  created() {
    this.$router.options.routes.forEach(route => {
      console.log(this.routes)
      this.routes.push({
        name: route.name,
        path: route.path,
        children: route.children,
        meta: route.meta
      })
    })
  },
  data() {
    return {
      routes: []
    }
  }
}
</script>

<style lang="scss" scoped>
// Vue Transition Styles
.smooth-enter-active, .smooth-leave-active {
  transition: all 0.17s;
  max-height: 175px;
}
.smooth-enter, .smooth-leave-to {
  max-height: 0px;
  padding: 0px;
  opacity: 0;
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

// Class to push tabs down with nav-menu
.push-down {
  margin-top: 13px;
}

// Mega Menu Styling
.navbar-item.is-mega {
  transition: all 0.25s;
  position: static;
  margin-bottom: -43px;
  max-width: 285px;
  z-index: 2;
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

// Media customizations
@media screen and (max-width: 1024px) {
  .navbar-item.is-mega {
    max-width: initial;
    margin-bottom: 0;
  }
  .navbar-item.has-dropdown.is-mega .navbar-link {
    color: white;
  }
}
</style>
