<template>
  <div>
    <scan-request-table
    :columns="columns"
    :tableType="tableType"
    :hasFilters="hasFilters"
    />
  </div>

</template>

<script>
import Table from '@/components/layout/Table'
export default {
  name: "ScanRequests",
  components: {
    'scan-request-table': Table
  },
  data () {
    return {
      tableType: 'scan_requests',
      columns: [
        'id',
        'name',
        'start_address',
        'end_address',
        'zone_id',
        'status',
        'brute_list_id',
        'zone_id',
        'updated_at'
      ],
      hasFilters: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
