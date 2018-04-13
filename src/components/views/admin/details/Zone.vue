<template>
  <visual-dc/>
</template>

<script>
  import VisualDC from '@/components/lib/VisualDC/VisualDC'
  export default {
    components: {
      'visual-dc': VisualDC
    },
    data () {
      return {
        tableType: 'zones',
        columns: [
          'id',
          'name',
          'foreman_location_id',
          'created_at'
        ]
      }
    }
  }
</script>
<style lang="scss">
</style>
