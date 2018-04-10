<template>
  <section class="section app-main">
    <div class="container is-fluid is-marginless">
      <level v-if="isAuthenticated" :onGuest="onGuest"/>
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view v-if="isAuthenticated || onGuest" class="animated"/>
      </transition>
    </div>
  </section>
</template>

<script>
import { WatchAuthModal } from '@/mixins'
import Level from './Level'
export default {
  components: {
    'level': Level
  },
  props: ['onGuest'],
  mixins: [WatchAuthModal]
}
</script>

<style lang="scss">
.app-main {
  padding-top: 1rem;
}
</style>
