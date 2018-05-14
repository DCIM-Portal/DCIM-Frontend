<template>
  <div>
    <bmc-host-table
    :columns="columns"
    :tableType="tableType"
    :orderField="orderField"
    :orderDirection="orderDirection"
    :filterDateType="filterDateType"
    :filterIp="filterIp"
    :hasFilters="hasFilters"
    />
  </div>

</template>

<script>
import Table from '@/components/layout/Table'
export default {
  name: "BmcHosts",
  components: {
    'bmc-host-table': Table
  },
  data () {
    return {
      tableType: 'bmc_hosts',
      columns: [
        'ip_address',
        'brand',
        'product',
        'serial',
        'zone_id',
        'power_status',
        'sync_status',
        'onboard_status',
        'onboard_step',
        'updated_at'
      ],
      orderField: "ip_address",
      orderDirection: "desc",
      filterDateType: "updated_at",
      filterIp: true,
      hasFilters: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
