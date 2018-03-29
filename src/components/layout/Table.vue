<template>
  <section>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <p class="title">Table</p>

          <b-select v-model="perPage">
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
            <option value="250">250 per page</option>
          </b-select>


    <b-table
      striped
      hoverable
      mobile-cards
      narrowed
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="onPageChange"
      :checked-rows.sync="checkedRows"
      checkable>
      <template slot-scope="props">

        <b-table-column v-if="props.row.id" field="id" label="ID">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column field="ip_address" label="IP Address">
          {{ props.row.ip_address }}
        </b-table-column>
        <b-table-column field="brand" label="Brand">
          {{ props.row.brand || "N/A"}}
        </b-table-column>
        <b-table-column field="product" label="Product" meta="Product">
          {{ props.row.product || "N/A"}}
        </b-table-column>
        <b-table-column field="serial" label="Serial">
          {{ props.row.serial || "N/A" }}
        </b-table-column>
        <b-table-column field="zone_id" label="Zone">
          {{ props.row.zone_id || "N/A" }}
        </b-table-column>
        <b-table-column field="power_status" label="Power Status">
          {{ props.row.power_status || "N/A" }}
        </b-table-column>
        <b-table-column field="sync_status" label="Sync Status">
          {{ props.row.sync_status || "N/A" }}
        </b-table-column>
        <b-table-column field="onboard_status" label="Onboard Status">
          {{ props.row.onboard_status || "N/A" }}
        </b-table-column>
        <b-table-column field="onboard_step" label="Onboard Step">
          {{ props.row.onboard_step || "N/A" }}
        </b-table-column>
        <b-table-column field="updated_at" label="Sync Time">
          {{ props.row.updated_at }}
        </b-table-column>

        <template slot="bottom-left">
          <b>Total checked</b>: {{ checkedRows.length }}
        </template>

      </template>



    </b-table>
  </article></div></div>
  </section>
</template>

<script>
import ApiService from '@/common/api.service'
export default {
  data () {
    return {
      data: [],
      pagesCount: '',
      loading: false,
      currentPage: 1,
      perPage: 10,
      checkedRows: []
    }
  },
  methods: {
    fetchCollection() {
      const params = [
        `?page=${this.currentPage}`,
        `per_page=${this.perPage}`
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
