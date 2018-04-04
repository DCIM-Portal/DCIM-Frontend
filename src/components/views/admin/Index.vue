<template>
  <div>
    <div v-if="this.$route.name == 'Admin'">I am Admin</div>
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
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
