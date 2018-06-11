<template>
  <section>
    <div class="box has-shadow table-level">
      <!--Top Controls -->
      <b-field grouped group-multiline>
        <div class="top-level">
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
          <div class="control flex-is-right">
            <b-input
              v-model="searchQuery"
              placeholder="Search..."
              type="search"
              icon="magnify"
              />
          </div>
        </div>
      </b-field>
      <!-- Filters -->
      <transition
        name="filter"
        enter-active-class="filterDown"
        leave-active-class="filterUp"
        :duration="300">
        <b-field
          v-show="filtersToggled"
          custom-class="is-large"
          class="table-box has-shadow animated"
          label="Filters">
          <b-field horizontal v-if="filterableColumns.length">
            <!-- IP Filter -->
            <b-field
              grouped
              group-multiline
              class="has-shadow"
              v-for="columnName in filterableBinaries"
              :label="$t('tables.'+tableType+'.'+columnName,
                $t('tables.application.'+columnName, columnName))"
              :key="columnName">
              <b-field
                label="Start IP"
                custom-class="is-small"
                :type="startIpFieldType(columnName)">
                <p v-if="validStartIp(columnName)" class="is-danger help ip">
                  Please input a valid IP
                </p>
                <b-input
                  v-model="rawStartIp[columnName]"
                  placeholder="Start IP Address"/>
              </b-field>
              <b-field
                label="End IP"
                custom-class="is-small"
                :type="endIpFieldType(columnName)">
                <p v-if="validEndIp(columnName)" class="is-danger help ip">
                  Please input a valid IP
                </p>
                <b-input
                  v-model="rawEndIp[columnName]"
                  placeholder="End IP Address"/>
              </b-field>
              <b-field class="filter-button">
                <button
                  class="button is-grey has-shadow"
                  @click="clearIps(columnName)">
                  <b-icon icon="close"/>
                  <span>Clear IPs</span>
                </button>
              </b-field>
            </b-field>
            <!-- Date Filter -->
            <b-field
              grouped
              group-multiline
              class="has-shadow"
              v-for="columnName in filterableDates"
              :label="$t('tables.'+tableType+'.'+columnName,
                $t('tables.application.'+columnName, columnName))"
              :key="columnName">
              <b-field label="Start Date" custom-class="is-small">
                <flat-pickr
                  v-model="minDate[columnName]"
                  :config="pickrConfigMin(columnName)"
                  :key="columnName+'_start'"
                  @on-change="onStartChange($event, columnName)"
                  placeholder="Select start date..."/>
              </b-field>
              <b-field label="End Date" custom-class="is-small">
                <flat-pickr
                  v-model="maxDate[columnName]"
                  :config="pickrConfigMax(columnName)"
                  :key="columnName+'_end'"
                  @on-change="onEndChange($event, columnName)"
                  placeholder="Select end date..."/>
              </b-field>
              <b-field class="filter-button">
                <button
                  class="button is-grey has-shadow"
                  @click="clearDates(columnName)">
                  <b-icon icon="close"/>
                  <span>Clear Dates</span>
                </button>
              </b-field>
            </b-field>
          </b-field>
          <!-- Enum Filters -->
          <div class="enum-filters">
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
        </b-field>
      </transition>
      <!-- Filter button -->
      <b-field grouped group-multiline class="table-level">
        <p class="control" v-if="hasFilters">
          <button
            class="button is-grey has-shadow"
            @click="toggleFilters"
            :class="{'is-pressed': filtersToggled}">
            <b-icon icon="filter-variant"></b-icon>
            <span>Filters</span>
          </button>
        </p>
        <!-- Clear selection -->
        <p class="control">
          <button class="button is-grey has-shadow">
            <b-icon icon="minus-box"></b-icon>
            <span>De-select All</span>
          </button>
        </p>
        <!-- Copy button -->
        <p class="control">
          <button class="button is-grey has-shadow">
            <b-icon icon="clipboard-text"></b-icon>
            <span>Copy to Clipboard</span>
          </button>
        </p>
        <!-- Excel button -->
        <p class="control">
          <button class="button is-grey has-shadow">
            <b-icon icon="file-excel"></b-icon>
            <span>Save to Excel</span>
          </button>
        </p>
      </b-field>
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
let ip = require('ip-address')
let ipv4 = ip.Address4;
import Multiselect from 'vue-multiselect'
import ApiService from '@/common/api.service'
import ApplicationTable from '@/components/lib/Table/ApplicationTable'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import qs from 'qs'
import moment from 'moment'
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
    },
    excludeFilterableColumns: {
      type: Array,
      default: () => []
    },
    hasFilters: {
      type: Boolean,
      default: false
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
      checkedRows: {},
      fetchCollectionCancelSource: ApiService.cancelToken(),
      sortOrder: this.orderDirection,
      sortField: this.orderField,
      filterSelections: {},
      tableStructure: [],
      minDate: {},
      maxDate: {},
      rawStartIp: {},
      rawEndIp: {},
      startIp: {},
      endIp: {},
      pickrConfigsMin: {},
      pickrConfigsMax: {},
      filtersToggled: false
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
        !this.excludeFilterableColumns.includes(column)
      )
    },
    filterableDates() {
      return this.filterableColumnTypes('datetime')
    },
    filterableBinaries() {
      return this.filterableColumnTypes('binary')
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
    }
  },
  methods: {
    filters() {
      let filters = {}
      Object.keys(this.filterSelections).forEach((column_name) => {
        filters[column_name] = []
        this.filterSelections[column_name].forEach((filter) => {
          filters[column_name].push(`${column_name}=${filter}`)
        })
      })
      Object.keys(this.minDate).forEach((column) => {
        if (this.minDate[column])
          filters[column + '_min_date'] =
            [`${column}>=${this.minDate[column]}`]
      })
      Object.keys(this.maxDate).forEach((column) => {
        if (this.maxDate[column])
          filters[column + '_max_date'] =
            [`${column}<=${this.maxDate[column]}`]
      })
      Object.keys(this.startIp).forEach((column) => {
        if (this.startIp[column])
          filters[column + '_start_address'] =
            [`${column}>=${this.startIp[column]}`]
      })
      Object.keys(this.endIp).forEach((column) => {
        if (this.endIp[column])
          filters[column + '_end_address'] =
            [`${column}<=${this.endIp[column]}`]
      })
      return JSON.stringify(filters)
    },
    validStartIp(column) {
      return this.rawStartIp[column] && !this.startIp[column]
    },
    validEndIp(column) {
      return this.rawEndIp[column] && !this.endIp[column]
    },
    startIpFieldType(column) {
      if (this.validStartIp(column)) {
        return "is-danger"
      }
    },
    endIpFieldType(column) {
      if (this.validEndIp(column)) {
        return "is-danger"
      }
    },
    filterableColumnTypes(type) {
      if (this.tableStructure.length) {
        return this.filterableColumns.filter(column =>
          this.columnToStructure(column).type === type
        )
      }
      return null
    },
    toggleFilters() {
      this.filtersToggled = !this.filtersToggled
    },
    ipToInt(ip) {
      try {
        let ipInst = new ipv4(ip)
        if (ipInst.isValid()) {
          return ipInst.bigInteger()[0]
        }
      }
      catch (error) {
      }
      return false
    },
    pickrConfigMin(column) {
      if (!this.pickrConfigsMin[column]) {
        this.$set(this.pickrConfigsMin, column, {
          enableTime: true,
          dateFormat: 'Z',
          altInput: true,
          altFormat: 'F j Y, h:iK',
          maxDate: null
        })
      }
      return this.pickrConfigsMin[column]
    },
    pickrConfigMax(column) {
      if (!this.pickrConfigsMax[column]) {
        this.$set(this.pickrConfigsMax, column, {
          enableTime: true,
          dateFormat: 'Z',
          altInput: true,
          altFormat: 'F j Y, h:iK',
          minDate: null
        })
      }
      return this.pickrConfigsMax[column]
    },
    onStartChange(event, column) {

      return function(selectedDates, dateStr, instance) {
        console.log("THIS WORKS")
        this.$set(this.pickrConfigsMax[column], 'minDate', dateStr)
      }
    },
    onEndChange(event, column) {
      return function(selectedDates, dateStr, instance) {
        this.$set(this.pickrConfigsMin[column], 'maxDate', dateStr)
      }
    },
    clearDates(column) {
      this.minDate[column] = null
      this.maxDate[column] = null
      this.$set(this.pickrConfigsMax[column], 'minDate', null)
      this.$set(this.pickrConfigsMin[column], 'maxDate', null)
    },
    clearIps(column) {
      this.rawEndIp[column] = null
      this.rawStartIp[column] = null
    },
    columnToStructure(column) {
      return this.tableStructure.find(item => item.name === column)
    },
    fetchStructure() {
      ApiService
        .get(this.$route.meta.apiPath + '/structure')
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
      params['filters'] = JSON.parse(this.filters())
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
    searchQuery() {
      this.fetchCollectionCancelSource.cancel(
        'New search requested before server response'
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
    },
    minDate: {
      handler(value) {
        this.fetchCollectionCancelSource.cancel(
          'Min date changed before server response'
        )
        this.fetchCollection()
      },
      deep: true
    },
    maxDate: {
      handler(value) {
        this.fetchCollectionCancelSource.cancel(
          'Max date changed before server response'
        )
        this.fetchCollection()
      },
      deep: true
    },
    rawStartIp: {
      handler(value) {
        Object.keys(value).forEach((column) => {
          let ip = this.ipToInt(value[column])
          if (ip || column in this.startIp)
            this.$set(this.startIp, column, ip)
        })
      },
      deep: true
    },
    rawEndIp: {
      handler(value) {
        Object.keys(value).forEach((column) => {
          let ip = this.ipToInt(value[column])
          if (ip || column in this.endIp)
            this.$set(this.endIp, column, ip)
        })
      },
      deep: true
    },
    startIp: {
      handler(value) {
        this.fetchCollectionCancelSource.cancel(
          'Start IP changed before server response'
        )
        this.fetchCollection()
      },
      deep: true
    },
    endIp: {
      handler(value) {
        this.fetchCollectionCancelSource.cancel(
          'End IP changed before server response'
        )
        this.fetchCollection()
      },
      deep: true
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
    }
  },
  mounted() {
    this.fetchCollection()
    this.fetchStructure()
  }
}
</script>
<style lang="scss" scoped>
// Fade in down
.filterDown {
  -webkit-animation-name: filterDown;
  animation-name: filterDown;
}
@keyframes filterDown {
  from {
    opacity: 0;
    max-height: 0px;
  }
  to {
    opacity: 1;
    max-height: 400px;
  }
}
// Fade out up
.filterUp {
  -webkit-animation-name: filterUp;
  animation-name: filterUp;
}
@keyframes filterUp {
  from {
    opacity: 1;
    max-height: 400px;
  }
  to {
    opacity: 0;
    max-height: 0px;
  }
}
</style>
