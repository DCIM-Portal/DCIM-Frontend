<template>
  <div class="b-table" :class="{ 'is-loading': loading }">
    <div class="table-wrapper">
      <table
        class="table"
        :class="tableClasses">
        <thead>
        <th v-if="checkable">
          <label class="b-checkbox checkbox">
            <input type="checkbox" :value="isAllChecked" @change.native="toggleCheckAll"/>
            <span class="check" @click="toggleCheckAll"/>
          </label>
        </th>
        <th v-for="column in columns" v-html="$t('tables.'+tableType+'.'+column, $t('tables.application.'+column, column))"></th>
        </thead>
        <tbody>
        <tr v-for="row in rows" :key="row.id" v-html="rowToHtml(row)">
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
      return {}
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
      checkedRows: {
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
      rowToHtml: function(row) {
        let out = '';
        out += this.addCheckbox()
        this.columns.forEach((column) => {
            out += `<td>${row[column]}</td>`
          }
        );
        return out
      },
      addCheckbox: function() {
        if (!this.checkable) return
        return `<td>
<label class="b-checkbox checkbox">
<input type="checkbox" value="false">
<span class="check" />
</label>
</td>`
      },
      toggleCheckAll: function() {
        console.log("HELLO")
        if (this.checkedRows.length === this.rows.length) {
          this.checkedRows = []
        } else {
          this.checkedRows = this.rows.map((row) => row.id)
        }
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
      isAllChecked() {
        return this.checkedRows.length === this.rows.length
      }
    }
  }
</script>

<style scoped>

</style>
