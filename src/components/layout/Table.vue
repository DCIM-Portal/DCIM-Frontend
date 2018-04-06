<template>
  <section>
    <!-- Table Controls -->
    <b-field
    group-multiline
    class="table-level"
    >
      <!-- Per Page -->
      <b-field :type="perPageFieldType">
        <div class="control is-flex">
          <label class="label">Per Page</label>
          <b-autocomplete
            v-model="localPerPage"
            :data="perPageOptions"
            :placeholder="perPage"
            type="number"
            @input="generatePerPageSuggestions"
            />
        </div>
      </b-field>
      <!-- Mobile Sort -->
      <!-- <b-select placeholder="Select a column">
        <option
          v-for="column in columns"
          :value="column"
          :key="column">
          {{ $t('tables.'+tableType+'.'+column,
          $t('tables.application.'+column, column)) }}
        </option>
      </b-select>
      <p class="control">
        <button class="button is-success"></button>
      </p> -->
      <!-- Search -->
      <div class="control is-absolute-right">
        <b-input
          v-model="localSearchQuery"
          placeholder="Search..."
          type="search"
          icon="magnify"
          />
      </div>

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
  </section>
</template>

<script>
import ApiService from '@/common/api.service'
import ApplicationTable from '@/components/lib/Table/ApplicationTable'
import debounce from 'lodash/debounce'
export default {
  components: {
    'b-table': ApplicationTable
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
      sortField: this.orderField
    }
  },
  computed: {
    searchableFields() {
      return this.columns.filter(item => item !== 'updated_at').join(",")
    }
  },
  methods: {
    fetchCollection: debounce(function() {
      console.log(this.sortOrder)
      const params = [
        `?page=${this.currentPage}`,
        `per_page=${this.perPage}`,
        `search[fields]=${this.searchableFields}`,
        `search[query]=${this.searchQuery}`,
        `order[${this.sortField}]=${this.sortOrder}`
      ].join('&')
      this.loading = true
      console.log(params)
      this.fetchCollectionCancelSource = ApiService.cancelToken()
      ApiService
        .get(this.$route.meta.apiPath + params,
          { cancelToken: this.fetchCollectionCancelSource.token })
        .then(res => {
          console.log(res)
          const table = res.data.pagination
          this.data = res.data.data
          this.pagesCount = table.pages_count
          this.currentPage = table.current_page_number
          this.perPage = table.records_per_page
          this.recordsCount = table.records_count
          this.searchQuery = res.data.search.query
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
        'New per page requested before server response'
      )
      this.fetchCollection()
    },
    sortOrder(newValue) {
      this.sortOrder = newValue
      this.fetchCollectionCancelSource.cancel(
        'New per page requested before server response'
      )
      this.fetchCollection()
    },
    sortField(newValue) {
      this.sortField = newValue
      this.fetchCollectionCancelSource.cancel(
        'New per page requested before server response'
      )
      this.fetchCollection()
    }
  },
  mounted() {
    this.fetchCollection()
  }
}
</script>

<style lang="scss">
div.table-level {
  div.autocomplete.control {
    .dropdown-menu {
      min-width: 85px;
      max-width: 85px;
      a.dropdown-item {
        font-size: 0.8rem;
      }
    }
    input {
      font-size: 0.8rem;
      max-width: 75px;
    }
  }
  // div.control.has-icons-left .icon,
  // div.control.has-icons-right .icon {
  //   z-index: 1;
  // }
  div.control {
    .label {
      font-weight: 300;
      font-size: 0.8rem;
      align-self: center;
      margin-right: 0.2rem;
    }
    input {
      max-width: 120px;
      font-size: 0.8rem;
    }
    .mdi::before {
      margin-bottom: 6px;
    }
  }
}
.pagination-list {
  a.pagination-link.is-current {
    background-color: #3d6075;
    border-color: #3d6075;
  }
}
.is-absolute-right {
  position: absolute;
  right: 0;
}
div.field:not(:last-child) {
  margin-bottom: 0.25rem;
}
</style>
