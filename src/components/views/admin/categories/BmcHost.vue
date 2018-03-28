<template>
  <section>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <p class="title">Table</p>
          <b-table
            striped
            hoverable
            mobile-cards
            narrowed
            :table-type="tableType"
            :rows="data"
            :columns="columns"
            :loading="loading"
            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"
            :checked-rows.sync="checkedRows"
            checkable>
          </b-table>
        </article></div></div>

  </section>
</template>
<script>
  import ApiService from '@/common/api.service'
  import ApplicationTable from '@/components/lib/Table/ApplicationTable'
  export default {
    data () {
      return {
        tableType: 'bmc_hosts',
        data: [],
        columns: [
          'id',
          'brand',
          'product',
          'serial',
          'updated_at'
        ],
        total: '',
        loading: false,
        sortField: 'vote_count',
        sortOrder: 'desc',
        defaultSortOrder: 'desc',
        page: 1,
        perPage: 10,
        checkedRows: {}
      }
    },
    components: {
      'b-table': ApplicationTable
    },
    methods: {
      fetchCollection() {
        const params = [
          `?page=${this.page}`,
          `per_page=4000`
        ].join('&')
        this.loading = true
        ApiService
          .get(this.$route.meta.apiPath + params)
          .then(res => {
            console.log(res)
            const table = res.data.pagination
            this.data = res.data.data
            this.total = table.pages_count
            this.page = table.current_page_number
            this.perPage = table.records_per_page
            this.loading = false
          })
          .catch(error => {
            console.log(error)
          })
      },
      onPageChange(page) {
        this.page = page
        this.fetchCollection()
      },
    },
    mounted() {
      this.fetchCollection()
    }
  }
</script>
<style lang="scss">
</style>
