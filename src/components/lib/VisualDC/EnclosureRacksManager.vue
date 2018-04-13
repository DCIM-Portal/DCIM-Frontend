<template>
  <section>
    <zone-grid
      :min-x="minX"
      :max-x="maxX"
      :min-y="minY"
      :max-y="maxY"
    />
  </section>
</template>

<script>
  import ZoneGrid from "./ZoneGrid";

  export default {
    name: "EnclosureRacksManager",
    data() {
      return {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      }
    },
    components: {
      'zone-grid': ZoneGrid
    }
  }
</script>

<style scoped>

</style>
