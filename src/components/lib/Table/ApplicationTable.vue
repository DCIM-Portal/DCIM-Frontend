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
  </div>
</template>

<script>
export default {
  name: "ApplicationTable",
  data() {
    return {
      selected: {},
      boolAllChecked: false
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
    }
  },
  watch: {
    rows(value) {
      value.forEach((row) =>
        this.$set(this.selected, row.id, false)
      )
    },
    selected: {
      handler(value) {
        this.boolAllChecked = this.isAllChecked()
      },
      deep: true
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
