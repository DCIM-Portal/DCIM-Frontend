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
        <th v-for="column in columns" v-html="$t('tables.'+tableType+'.'+column, $t('tables.application.'+column, column))"></th>
        </thead>
        <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td class="checkbox-cell" v-if="checkable">
            <label class="b-checkbox checkbox">
            <input type="checkbox" v-model="selected[row.id]" :value="row.id" :key="row.id">
              <span class="check" />
            </label>
          </td>
          <td v-for="column in columns" v-html="row[column]"/>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="checkable || paginated" class="level">
      <div class="level-left">
        <slot name="bottom-left"/>
      </div>

      <div class="level-right">
        <div v-if="paginated" class="level-item">
          <b-pagination
            :total="pagesCount"
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
export default {
  name: "ApplicationTable",
  data() {
    return {
      selected: {},
      boolAllChecked: false,
      localCurrentPage: this.currentPage,
      localPagesCount: this.pagesCount
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
    mobileCards: {
      type: Boolean,
      default: true
    },
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
    }
  },
  watch: {
    rows(value) {
      value.forEach((row) =>
        // TODO: Preserve selected rows on new data and page changes
        this.$set(this.selected, row.id, false)
      )
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
    }
  }
}
</script>

<style scoped>

</style>
