<template>
<div>
  <p>I AM ZoneRack landing</p>
  <transition
    mode="out-in"
    enter-active-class="fadeIn"
    leave-active-class="fadeOut"
    appear>
    <router-view class="animated"/>
  </transition>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
