<template>
  <section class="section app-main">
    <div class="container is-fluid is-marginless">
      <level/>
      <router-view/>
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
