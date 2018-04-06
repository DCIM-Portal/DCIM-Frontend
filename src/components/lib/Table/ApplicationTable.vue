<template>
  <div class="b-table" :class="{ 'is-loading': loading }">
    <div class="table-wrapper">
      <table
        class="table"
        :class="tableClasses">
        <thead>
        <th class="checkbox-cell" v-if="checkable">
          <label class="b-checkbox checkbox">
          <input type="checkbox" v-model="allChecked"/>
          <span class="check"/>
          </label>
        </th>
        <th v-for="column in columns"
          :data-label="$t('tables.'+tableType+'.'+column,
          $t('tables.application.'+column, column))"
          v-html="$t('tables.'+tableType+'.'+column,
          $t('tables.application.'+column, column))"
          :class="{
            'sort-column mdi mdi-arrow-down-bold':
              column == isCurrentSort,
            'mdi-arrow-up-bold': (isAsc && column == isCurrentSort)
            }"
          @click.stop="sort(column)">
        </th>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td class="checkbox-cell" v-if="checkable">
              <label class="b-checkbox checkbox">
              <input type="checkbox"
                v-model="selected[row.id]"
                :value="row.id"
                :key="row.id">
              <span class="check" />
              </label>
            </td>
            <td v-for="column in columns"
              :data-label="$t('tables.'+tableType+'.'+column,
              $t('tables.application.'+column, column))">
              <div v-if="columnNameToType[column]" v-html="columnNameToType[column](row[column])"/>
              <div v-else-if="row[column] == null">N/A</div>
              <div v-else v-html="row[column]"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="checkable || paginated" class="level">
      <div class="level-left">
        Showing {{ perPage * (localCurrentPage - 1) + 1 }} to
        {{ Math.min(localCurrentPage*perPage, recordsCount) }}
        of {{ recordsCount }}
        <br/>
        <div v-if="isAnyChecked">
          ({{ countChecked }} selected)
        </div>
      </div>

      <div class="level-right">
        <div v-if="paginated" class="level-item">
          <b-pagination
            :total="recordsCount"
            :per-page="perPage"
            :simple="paginationSimple"
            :size="paginationSize"
            :current="localCurrentPage"
            @change="pageChanged"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TableCellRenderers } from '@/mixins'
import '@/assets/css/utilities.scss'
export default {
  name: "ApplicationTable",
  mixins: [ TableCellRenderers ],
  data() {
    return {
      selected: {},
      boolAllChecked: false,
      localCurrentPage: this.currentPage,
      localPagesCount: this.pagesCount,
      localSortOrder: this.sortOrder,
      localSortField: this.sortField
    }
  },
  props: {
    tableType: {
      type: String,
      default: 'application'
    },
    rows: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    checkable: Boolean,
    loading: Boolean,
    bordered: Boolean,
    striped: Boolean,
    narrowed: Boolean,
    hoverable: Boolean,
    paginated: Boolean,
    paginationSize: String,
    paginationSimple: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    pagesCount: {
      type: [Number, String],
      default: 0
    },
    perPage: {
      type: [Number, String],
      default: 20
    },
    recordsCount: {
      type: [Number, String],
      default: undefined
    },
    mobileCards: {
      type: Boolean,
      default: true
    },
    sortField: String,
    sortOrder: String
  },
  methods: {
    isAllChecked() {
      if (this.rows.length === 0) {
        return false;
      }
      let bool = true
      this.rows.forEach((row) => {
          if (this.selected[row.id] === false) {
            bool = false
            return
          }
        }
      )
      return bool
    },
    pageChanged(page) {
      this.localCurrentPage = page > 0 ? page : 1
      this.$emit('page-change', this.localCurrentPage)
      this.$emit('update:currentPage', this.localCurrentPage)
    },
    sort(column) {
      if (column == this.localSortField) {
        this.localSortOrder = (this.localSortOrder === 'desc') ? 'asc' : 'desc'
        this.$emit('update:sortOrder', this.localSortOrder)
      } else {
        this.localSortField = column
        this.localSortOrder = 'desc'
        this.$emit('update:sortOrder', this.localSortOrder)
        this.$emit('update:sortField', this.localSortField)
      }
    }
  },
  watch: {
    rows(value) {
      value.forEach((row) => {
        if (this.selected[row.id] === undefined)
          this.$set(this.selected, row.id, false)
      })
      this.boolAllChecked = this.isAllChecked()
    },
    selected: {
      handler(value) {
        this.boolAllChecked = this.isAllChecked()
      },
      deep: true
    },
    currentPage(newValue) {
      this.localCurrentPage = newValue
    }
  },
  computed: {
    tableClasses() {
      return {
        'is-bordered': this.bordered,
        'is-striped': this.striped,
        'is-narrow': this.narrowed,
        'has-mobile-cards': this.mobileCards,
        'is-hoverable': (
          (this.hoverable || this.focusable) &&
          this.rows.length
        )
      }
    },
    allChecked: {
      get() {
        this.isAllChecked()
        return this.boolAllChecked
      },
      set(value) {
        value = !!value
        this.rows.forEach((row) =>
          this.selected[row.id] = value
        )
        this.boolAllChecked = value
      }
    },
    isAnyChecked() {
      return Object.values(this.selected).some((value) => value === true)
    },
    countChecked() {
      return Object.values(this.selected).reduce((accumulator, value) => {
        return accumulator + (value === true)
      }, 0)
    },
    isCurrentSort() {
      return this.localSortField
    },
    isAsc() {
      return this.localSortOrder == 'asc'
    }
  }
}
</script>

<style lang="scss" scoped>
div.b-table {
  table.table {
    font-size: 0.9rem;
    font-weight: 300;
    background: transparent;
    thead {
      background-image: linear-gradient(140deg, #243b42 50%, #456c86 100%);
      th {
        font-weight: 400;
        color: white;
        border-bottom: none;
        transition: all 0.25s;
      }
      th.sort-column {
        background: #ffffff36;
      }
      th.sort-column.mdi::before {
        font-size: 14px;
        display: inline;
      }
      th.checkbox-cell {
        span.check {
          border: 2px solid #ffffff;
        }
      }
    }
  }
  table.table.is-striped {
    tbody {
      tr:not(.is-selected):nth-child(odd) {
        background-color: white;
      }
      tr:not(.is-selected):hover {
        background-color: whitesmoke;
      }
    }
  }
}
.b-checkbox.checkbox input[type=checkbox]:checked + .check {
  border-color: #00d1b2;
}
.b-checkbox.checkbox input[type=checkbox] + .check {
  width: 1.05em;
  height: 1.05em;
}
.b-table .table .checkbox-cell .checkbox {
  vertical-align: initial;
}
.level-left {
  font-size: 0.9rem;
}
.pagination {
  font-size: 0.8rem;
}
@media screen and (max-width: 1024px) {
  [data-label="Onboard Step"],
  [data-label="Onboard Status"],
  [data-label="Brand"]  {
    display:none;
  }
}
</style>
