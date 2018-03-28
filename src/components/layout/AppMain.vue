<template>
  <section class="section app-main">
    <div class="container is-fluid is-marginless">
      <level/>
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"/>
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
  mixins: [WatchAuthModal]
}
</script>

<style lang="scss">
.app-main {
  padding-top: 1rem;
}
.material-design-icon > .material-design-icon__svg {
  height: 1.2em;
  width: 1.2em;
}
.b-checkbox.checkbox input[type=checkbox] + .check {
  width: 1.05em;
  height: 1.05em;
}
</style>
