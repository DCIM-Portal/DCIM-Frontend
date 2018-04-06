<template>
  <zone-table
    :columns="columns"
    :tableType="tableType"
    />
</template>

<script>
import Table from '@/components/layout/Table'
export default {
  components: {
    'zone-table': Table
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
