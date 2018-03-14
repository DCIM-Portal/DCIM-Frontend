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
import Level from './Level'
export default {
  components: {
    'level': Level
  }
}
</script>

<style lang="scss">
.app-main {
  padding-top: 1rem;
}
</style>
