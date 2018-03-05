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
@import '~bulma';
html {
  background-color: #f5f5f5;
}
.app-main {
  padding-top: 1rem;
}
</style>
