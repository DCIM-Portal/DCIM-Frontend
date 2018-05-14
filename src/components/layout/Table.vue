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
        enter-active-class="fadeInDown"
        leave-active-class="fadeOutUp"
        :duration="320">
        <b-field
          v-show="filtersToggled"
          custom-class="is-large"
          class="table-box has-shadow animated"
          label="Filters">
          <b-field horizontal v-if="filterIp || filterDateType">
            <!-- IP Filter -->
            <b-field
              grouped
              group-multiline
              v-if="filterIp">
              <b-field
                label="Start IP"
                custom-class="is-small"
                :type="startIpFieldType">
                <p v-if="validStartIp" class="is-danger help ip">
                  Please input a valid IP
                </p>
                <b-input
                  v-model="rawStartIp"
                  placeholder="Start IP Address"/>
              </b-field>
              <b-field
                label="End IP"
                custom-class="is-small"
                :type="endIpFieldType">
                <p v-if="validEndIp" class="is-danger help ip">
                  Please input a valid IP
                </p>
                <b-input
                  v-model="rawEndIp"
                  placeholder="End IP Address"/>
              </b-field>
              <b-field class="filter-button">
                <button
                  class="button is-grey has-shadow"
                  @click="clearIps">
                  <b-icon icon="close"/>
                  <span>Clear IPs</span>
                </button>
              </b-field>
            </b-field>
            <!-- Date Filter -->
            <b-field
              grouped
              group-multiline
              v-if="filterDateType">
              <b-field label="Start Date">
                <flat-pickr
                  v-model="minDate"
                  :config="pickrConfigMin"
                  @on-change="onStartChange"
                  placeholder="Select start date..."/>
              </b-field>
              <b-field label="End Date">
                <flat-pickr
                  v-model="maxDate"
                  :config="pickrConfigMax"
                  @on-change="onEndChange"
                  placeholder="Select end date..."/>
              </b-field>
              <b-field class="filter-button">
                <button
                  class="button is-grey has-shadow"
                  @click="clearDates">
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
    },
    filterDateType: {
      type: String,
      default: null
    },
    filterIp: {
      type: Boolean,
      default: false
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
      pickrConfigMin: {
        enableTime: true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'F j Y, h:iK',
        maxDate: null
      },
      pickrConfigMax: {
        enableTime: true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'F j Y, h:iK',
        minDate: null
      },
      minDate: null,
      maxDate: null,
      rawStartIp: null,
      rawEndIp: null,
      filtersToggled: false
    }
  },
  computed: {
    filters() {
      let filters = {}
      Object.keys(this.filterSelections).forEach((column_name) => {
        filters[column_name] = []
        this.filterSelections[column_name].forEach((filter) => {
          filters[column_name].push(`${column_name}=${filter}`)
        })
      })
      if (this.minDate) {
        filters['min_date'] = this.dateFilter(this.filterDateType, this.minDate)
      }
      if (this.maxDate) {
        filters['max_date'] = this.dateFilter(this.filterDateType, this.maxDate)
      }
      if (this.startIp) {
        filters['start_address'] = [`ip_address>=${this.startIp}`]
      }
      if (this.endIp) {
        filters['end_address'] = [`ip_address<=${this.endIp}`]
      }
      return JSON.stringify(filters)
    },
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
    startIp() {
      return this.ipToInt(this.rawStartIp)
    },
    validStartIp() {
      return (this.rawStartIp && !this.startIp)
    },
    startIpFieldType() {
      if (this.validStartIp) {
        return "is-danger"
      }
    },
    endIp() {
      return this.ipToInt(this.rawEndIp)
    },
    validEndIp() {
      return (this.rawEndIp && !this.endIp)
    },
    endIpFieldType() {
      if (this.validEndIp) {
        return "is-danger"
      }
    },
    ipRange() {
      if (this.startIp && this.endIp && this.startIp > this.endIp ||
      (!this.startIp && !this.endIp)) {
        return false
      }
      return JSON.stringify([this.startIp, this.endIp])
    }
  },
  methods: {
    dateFilter(type, date) {
      if (this.minDate !== this.maxDate) {
        if (date === this.minDate) {
          return [`${type}>=${date}`]
        } else if (date === this.maxDate ) {
          return [`${type}<=${date}`]
        }
      } else if (this.minDate === this.maxDate) {
        return [`${type}=${date}`]
      }
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
    clearIps() {
      if (this.rawEndIp || this.rawStartIp) {
        this.rawEndIp = null
        this.rawStartIp = null
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
      params['filters'] = JSON.parse(this.filters)
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
    filters() {
      this.fetchCollectionCancelSource.cancel(
        'Filters changed before server response'
      )
      this.fetchCollection()
    },
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
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}
@keyframes fadeInDown {
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
.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
}
@keyframes fadeOutUp {
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
