<template>
  <section>
    <div class="box has-shadow">
      <!--Top Controls -->
      <b-field
        group-multiline
        class="table-level top-controls">
        <!-- Per Page -->
        <b-field :type="perPageFieldType">
          <div class="control is-flex">
            <label class="label">Per Page</label>
            <b-autocomplete
              v-model="localPerPage"
              :data="perPageOptions"
              :placeholder="perPage"
              type="number"
              @input="generatePerPageSuggestions"/>
          </div>
        </b-field>
        <!-- Magic Search -->
        <div class="control is-absolute-right">
          <b-input
            v-model="localSearchQuery"
            placeholder="Search..."
            type="search"
            icon="magnify"
            />
        </div>
      </b-field>
      <!-- Table control buttons -->
      <b-field
      group-multiline
      class="table-level">
        <!-- Clear selection -->
        <p class="control table-button">
          <button class="button is-grey has-shadow">
              <b-icon icon="minus-box"></b-icon>
              <span class="is-hidden-mobile">De-select All</span>
          </button>
        </p>
        <!-- Copy button -->
        <p class="control table-button">
          <button class="button is-grey has-shadow">
              <b-icon icon="clipboard-text"></b-icon>
              <span class="is-hidden-mobile">Copy to Clipboard</span>
          </button>
        </p>
        <!-- Excel button -->
        <p class="control table-button">
          <button class="button is-grey has-shadow">
              <b-icon icon="file-excel"></b-icon>
              <span class="is-hidden-mobile">Save to Excel</span>
          </button>
        </p>
    </b-field>
    <!-- IP Filter -->
    <div class="filters">
      <b-field
        group-multiline
        class="table-level has-addons">
        <div class="control table-button is-flex">
          <b-field label="Start IP" class="is-paddingless">
          </b-field>
          <b-field label="End IP" class="is-paddingless">
          </b-field>
        </div>
      </b-field>
    </div>
    <!-- Date Filter -->
    <div class="filters">
      <b-field
        group-multiline
        class="table-level has-addons">
        <div class="control table-button is-flex">
          <b-field label="Start Date" class="is-paddingless">
            <flat-pickr
              v-model="pickMinDate"
              :config="pickrConfigMin"
              @on-change="onStartChange"
              placeholder="Select start date..."/>
          </b-field>
          <b-field label="End Date" class="is-paddingless">
            <flat-pickr
              v-model="pickMaxDate"
              :config="pickrConfigMax"
              @on-change="onEndChange"
              placeholder="Select end date..."/>
          </b-field>
          <button
            class="button is-grey has-shadow is-centered push-down"
            @click="clearDates">
            <b-icon icon="close"/>
            <span class="is-hidden-mobile">Clear Dates</span>
          </button>
        </div>
      </b-field>
    </div>
    <!-- Enum Filters -->
    <div class="filters">
      <b-field
        v-for="enumFilter in filterableEnums"
        :key="enumFilter.name"
        :label="$t('tables.'+tableType+'.'+enumFilter.name,
          $t('tables.application.'+enumFilter.name, enumFilter.name))">
        <div>
          <multiselect
            :options="Object.keys(enumFilter.enums)"
            :customLabel=
              "opt=>
                $t('tables.attributes.'+enumFilter.name+'.'+opt,
                opt)"
            :multiple="true"
            :searchable="false"
            :limit="2"
            :close-on-select="false"
            :hide-selected="false"
            placeholder="Select Filter"
            :showLabels="false"
            :optionHeight="10"
            v-model="filterSelections[enumFilter.name]"
            class="has-shadow">
            <template slot="tag" slot-scope="props">
              <span class="tag is-success has-shadow">
                <span>
                  {{
                    $t('tables.attributes.'+enumFilter.name+
                    '.'+props.option, props.option)
                  }}
                </span>
                <span
                  class="custom__remove"
                  @click="props.remove(props.option)">
                  ❌
                </span>
              </span>
            </template>
          </multiselect>
        </div>
      </b-field>
    </div>

    <!-- Table -->
    <b-table
      striped
      hoverable
      mobile-cards
      :table-type="tableType"
      :rows="data"
      :columns="columns"
      :records-count="recordsCount"
      :loading="loading"
      paginated
      :pages-count="pagesCount"
      :per-page="perPage"
      @page-change="onPageChange"
      :sortField.sync="sortField"
      :sortOrder.sync="sortOrder"
      checkable
      />

    </div>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ApiService from '@/common/api.service'
import ApplicationTable from '@/components/lib/Table/ApplicationTable'
import debounce from 'lodash/debounce'
import qs from 'qs'
export default {
  name: "Table",
  components: {
    'b-table': ApplicationTable,
    'multiselect': Multiselect
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableType: {
      type: String,
      default: 'application'
    },
    orderField: {
      type: String,
      default: 'id'
    },
    orderDirection: {
      type: String,
      default: 'desc'
    }
  },
  data () {
    return {
      data: [],
      pagesCount: '',
      recordsCount: undefined,
      loading: false,
      currentPage: 1,
      perPage: 10,
      localPerPage: 10,
      perPageOptions: [],
      perPageFieldType: undefined,
      searchQuery: '',
      localSearchQuery: '',
      checkedRows: {},
      fetchCollectionCancelSource: ApiService.cancelToken(),
      sortOrder: this.orderDirection,
      sortField: this.orderField,
      filterSelections: {},
      tableStructure: [],
      pickrConfigMin: {
        enableTime: true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'F j Y, h:iK',
        maxDate: this.maxDate
      },
      pickrConfigMax: {
        enableTime: true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'F j Y, h:iK',
        minDate: this.minDate
      },
      minDate: null,
      maxDate: null
    }
  },
  computed: {
    searchableColumns() {
      if (this.tableStructure.length) {
        return this.columns.filter(column => {
          let columnStructure = this.columnToStructure(column)
          return columnStructure.type === 'string'
        })
      }
      return this.columns
    },
    filterableColumns() {
      return this.columns.filter(
        column => !this.searchableColumns.includes(column) &&
        ['ip_address', 'updated_at', 'created_at'].includes
      )
    },
    filterableEnums() {
      let output = []
      try {
        this.filterableColumns.forEach((column) => {
          let columnStructure = this.columnToStructure(column)
          if (columnStructure.type === 'enum') {
            output.push(
              {
                  "name": columnStructure.name,
                  "enums": columnStructure.enum,
              }
            )
          }
        })
      }
      catch (error) {
      }
      return output
    },
    pickMinDate: {
      get () {
        return this.value
      },
      set(newVal) {
        this.value = newVal
        this.minDate = newVal
        if (newVal) {
          this.fetchCollection()
        }
        return this.value
      }
    },
    pickMaxDate: {
      get () {
        return this.value
      },
      set(newVal) {
        this.value = newVal
        this.maxDate = newVal
        if (newVal) {
          this.fetchCollection()
        }
        return this.value
      }
    }
  },
  methods: {
    onStartChange(selectedDates, dateStr, instance) {
      this.$set(this.pickrConfigMax, 'minDate', dateStr)
    },
    onEndChange(selectedDates, dateStr, instance) {
      this.$set(this.pickrConfigMin, 'maxDate', dateStr)
    },
    clearDates() {
      if (this.minDate || this.maxDate) {
        this.minDate = null
        this.maxDate = null
        this.$set(this.pickrConfigMax, 'minDate', null)
        this.$set(this.pickrConfigMin, 'maxDate', null)
        this.fetchCollection()
      }
    },
    columnToStructure(column) {
      return this.tableStructure.find(item => item.name === column)
    },
    fetchStructure() {
      ApiService
        .get(this.tableType + '/structure')
        .then(res => {
          this.tableStructure = res.data.data
        })
        .catch(error => {
          // Handled with axios inteceptor
        })
    },
    fetchCollection: debounce(function() {
      console.log("FETCHING")
      let params = {
        page: this.currentPage,
        per_page: this.perPage,
        order: {}
      }
      params['order'][this.sortField] = this.sortOrder
      let filters = {}
      Object.keys(this.filterSelections).forEach((column_name) => {
        filters[column_name] = []
        this.filterSelections[column_name].forEach((filter) => {
          filters[column_name].push(`${column_name}=${filter}`)
        })
      })
      if (this.minDate) {
        filters['min_date'] = []
        filters['min_date'].push(`updated_at>=${this.minDate}`)
      }
      if (this.maxDate) {
        filters['max_date'] = []
        filters['max_date'].push(`updated_at<=${this.maxDate}`)
      }
      params['filters'] = filters
      if (this.searchQuery && !(/^\s*$/.test(this.searchQuery))) {
        params['search'] = {
          fields: this.searchableColumns.join(","),
          query: this.searchQuery
        }
      }
      this.loading = true
      this.fetchCollectionCancelSource = ApiService.cancelToken()
      ApiService
        .get(this.$route.meta.apiPath, {
          params: params,
          cancelToken: this.fetchCollectionCancelSource.token
        })
        .then(res => {
          const table = res.data.pagination
          this.data = res.data.data
          this.pagesCount = table.pages_count
          this.currentPage = table.current_page_number
          this.perPage = table.records_per_page
          this.recordsCount = table.records_count
          if (this.searchQuery && !(/^\s*$/.test(this.searchQuery))) {
            this.searchQuery = res.data.search.query
          }
          this.loading = false
        })
        .catch(error => {
          // Handled with axios inteceptor
        })
      return params
    }, 500, {leading: true}),
    onPageChange(page) {
      if (page !== this.currentPage) {
        this.currentPage = page
        this.fetchCollection()
      }
    },
    generatePerPageSuggestions() {
      this.perPageOptions = [
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "2000",
        "5000",
        "10000"
      ]
    }
  },
  watch: {
    localPerPage(newValue) {
      if (parseInt(newValue) > 0) {
        this.perPage = newValue
        this.fetchCollectionCancelSource.cancel(
          'New per page requested before server response'
        )
        this.fetchCollection()
        this.perPageFieldType = undefined
      } else if (newValue.length === 0) {
        this.perPageFieldType = undefined
      } else {
        this.perPageFieldType = 'is-danger'
      }
    },
    localSearchQuery(newValue) {
      this.searchQuery = newValue
      this.fetchCollectionCancelSource.cancel(
        'New search requested before server response'
      )
      this.fetchCollection()
    },
    sortOrder(newValue) {
      this.sortOrder = newValue
      this.fetchCollectionCancelSource.cancel(
        'New sort order requested before server response'
      )
      this.fetchCollection()
    },
    sortField(newValue) {
      this.sortField = newValue
      this.fetchCollectionCancelSource.cancel(
        'New sort field requested before server response'
      )
      this.fetchCollection()
    },
    filterSelections: {
      handler(value) {
        this.filterSelections = value
        this.fetchCollectionCancelSource.cancel(
          'New filter requested before server response'
        )
        this.fetchCollection()
      },
      deep: true
    }
  },
  mounted() {
    this.fetchCollection()
    this.fetchStructure()
  }
}
</script>
<style lang="scss" scoped>
</style>
