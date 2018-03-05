<template>
  <div id="app">
    <app-hero></app-hero>
    <app-main></app-main>
  </div>
</template>

<script>
import Hero from '@/components/layout/Hero'
import AppMain from '@/components/layout/AppMain'
export default {
  components: {
    'app-main': AppMain,
    'app-hero': Hero
  },
  name: 'App'
}
</script>

<style>

</style>
