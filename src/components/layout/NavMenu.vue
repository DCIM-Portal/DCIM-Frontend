<template>
  <div class="navbar-dropdown">
    <div class="container is-fluid">
        <app-admin-menu v-if="parent_route == 'Admin'">
          <div slot="menu-content" class="column">
            {{ routes }}
          </div>
        </app-admin-menu>
      </div>
    </div>

</template>

<script>
import AdminMenu from '@/components/views/navmenu/AdminMenu'
import ParentRoute from '@/mixins/parentRoute'
export default {
  props: ['parent_route', 'routes'],
  components: {
    'app-admin-menu': AdminMenu
  }
}
</script>


<style lang="scss" scoped>

</style>
