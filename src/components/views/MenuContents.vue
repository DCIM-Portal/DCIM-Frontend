<template>
  <transition name="smooth">
  <div class="columns">
    <slot name="main-menu"/>
    <slot name="menu-content"/>
  </div>
</transition>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>

</style>
