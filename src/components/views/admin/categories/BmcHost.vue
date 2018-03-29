<template>
  <section>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <p class="title">Table</p>
          <b-field label="Per page" :type="perPageFieldType">
            <b-autocomplete
              v-model="localPerPage"
              :data="perPageOptions"
              :placeholder="perPage"
              type="number"
              @input="generatePerPageSuggestions"
            >
            </b-autocomplete>
            <!--<b-input v-model="perPage" list="per-page-presets"></b-input>-->
            <!--<datalist id="per-page-presets">-->
              <!--<option value="10">10</option>-->
              <!--<option value="25">25</option>-->
              <!--<option value="50">50</option>-->
              <!--<option value="100">100</option>-->
              <!--<option value="250">250</option>-->
              <!--<option value="500">500</option>-->
              <!--<option value="1000">1000</option>-->
              <!--<option value="2000">2000</option>-->
              <!--<option value="5000">5000</option>-->
              <!--<option value="10000">10000</option>-->
            <!--</datalist>-->
          </b-field>
          <b-table
            striped
            hoverable
            mobile-cards
            narrowed
            :table-type="tableType"
            :rows="data"
            :columns="columns"
            :records-count="recordsCount"
            :loading="loading"
            paginated
            backend-pagination
            :pages-count="pagesCount"
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
  import debounce from 'lodash/debounce'
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
        pagesCount: '',
        recordsCount: undefined,
        loading: false,
        sortField: 'vote_count',
        sortOrder: 'desc',
        defaultSortOrder: 'desc',
        currentPage: 1,
        perPage: 10,
        localPerPage: 10,
        perPageOptions: [],
        perPageFieldType: undefined,
        checkedRows: {},
        fetchCollectionCancelSource: ApiService.cancelToken(),
      }
    },
    components: {
      'b-table': ApplicationTable
    },
    methods: {
      fetchCollection: debounce(function() {
        const params = [
          `?page=${this.currentPage}`,
          `per_page=${this.perPage}`
        ].join('&')
        this.loading = true
        this.fetchCollectionCancelSource = ApiService.cancelToken()
        ApiService
          .get(this.$route.meta.apiPath + params, { cancelToken: this.fetchCollectionCancelSource.token })
          .then(res => {
            console.log(res)
            const table = res.data.pagination
            this.data = res.data.data
            this.pagesCount = table.pages_count
            this.currentPage = table.current_page_number
            this.perPage = table.records_per_page
            this.recordsCount = table.records_count
            this.loading = false
          })
          .catch(error => {
            console.log(error)
          })
        return params
      }, 500, {leading: true}),
      onPageChange(page) {
        this.currentPage = page
        this.fetchCollection()
      },
      generatePerPageSuggestions() {
        this.perPageOptions = ["10", "25", "50", "100", "250", "500", "1000", "2000", "5000", "10000"]
      }
    },
    watch: {
      perPage(newValue) {
        // this.localPerPage = newValue
      },
      localPerPage(newValue) {
        if (parseInt(newValue) > 0) {
          this.perPage = newValue
          this.fetchCollectionCancelSource.cancel('New per page requested before server response')
          this.fetchCollection()
          this.perPageFieldType = undefined
        } else if (newValue.length === 0) {
          this.perPageFieldType = undefined
        } else {
          this.perPageFieldType = 'is-danger'
        }
      }
    },
    mounted() {
      this.fetchCollection()
    }
  }
</script>
<style lang="scss">
</style>
