<template>
  <div class="navbar-dropdown">
    <div class="container is-fluid">
      <app-menu-content>
        <!-- menu-content -->
        <div slot="menu-content" class="column"
          v-for="section in routeSections"
          :key="section.title">
          <div class="column-wrapper">
            <h1 v-if="!section.info" class="title is-6 is-mega-menu-title">
              <router-link
                :to="linkableSection(section)"
                v-if="linkableSection(section)"
                @click.native="toggleMenu">
                {{ section.title }}
              </router-link>
            </h1>

            <router-link
              class="navbar-item"
              v-if="(section.info && section.title)"
              :to="linkableSection(section)"
              @click.native="toggleMenu">
              <div class="navbar-content">
                <p class="has-text-info">{{ section.title }}</p>
                <small>{{ section.info }}</small>
              </div>
            </router-link>
            <router-link class="navbar-item"
              v-for="category in subroutesOfSection(section)"
              :to="category"
              :key="category.title"
              @click.native="toggleMenu"
              exact>
              <div class="navbar-content">
                <p class="has-text-info">{{ category.title }}</p>
                <small>{{ category.info }}</small>
              </div>
            </router-link>
          </div>
        </div>

      </app-menu-content>
    </div>
  </div>

</template>

<script>
  import MenuContent from '@/components/views/navmenu/MenuContent'
  import ToggleMenu from '@/mixins/toggleMenu'
  export default {
    props: ['parentRouteTitle', 'routesBuilder'],
    components: {
      'app-menu-content': MenuContent,
    },
    mixins: [ToggleMenu],
    computed: {
      routeSections() {
        return this.routesBuilder.getSectionsFromPath(this.$route.matched[0].path)
      }
    },
    methods: {
      linkableSection(section) {
        return this.routesBuilder.getLinkableRouteFromPath(section.path)
      },
      subroutesOfSection(section) {
        let subroutes = this.routesBuilder.getSubroutesOfPath(section.path)
        if (subroutes.length > 0 && subroutes[0].path.endsWith('/')) subroutes = subroutes.splice(1)
        return subroutes
      }
    }
  }
</script>


<style lang="scss" scoped>
  // Mega-menu style customizations
  .hero {
    .is-mega-menu-title {
      margin-bottom: 0;
      padding: .375rem 1rem;
      color: #363636;
      font-weight: 600;
    }
    a:not(.button):not(.dropdown-item):not(.tag) {
      color: black;
    }
  }
  .has-text-info {
    color: #456c86 !important;
  }
  .hero.is-info a.navbar-item:hover {
    background-color: #f5f5f5;
  }
  .column:first-child {
    a.navbar-item {
      //padding-top: 50px;
      font-size: 1.4em;
      padding-right: 0.5rem;
      padding-left: 0;
      .navbar-content {
        line-height: 1em;
        padding: 1em;
        small {
          font-size: 0.775rem;
        }
      }
      .navbar-content:hover {
        background-color: #f5f5f5;
      }
    }
    a.navbar-item:hover {
      background-color: transparent;
    }
  }
  .column-wrapper {
    height: 100%;
    padding-right: 1.6em;
    border-right: 3px solid whitesmoke;
  }
  .column:last-child .column-wrapper {
    border-right: none;
  }

  // IE fix for columns in mobile view
  @media only screen and (max-width: 1024px) {
    _:-ms-fullscreen, :root .columns:not(.is-desktop) {
      display: block !important;
    }
  }

  // General screen fixes
  @media screen and (max-width: 1024px) {
    .hero {
      .is-mega-menu-title {
        color: rgba(255, 255, 255, 0.9);
      }
      a:not(.button):not(.dropdown-item):not(.tag) {
        color: #b9b9b9;
      }
    }
    .has-text-info {
      color: #91c8ec !important;
    }
    .hero.is-info a.navbar-item:hover {
      background-color: #f5f5f521;
    }
    .column-wrapper {
      border-right: none;
    }
  }
</style>
