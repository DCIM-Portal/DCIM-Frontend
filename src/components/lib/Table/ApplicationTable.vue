<template>
  <div class="b-table" :class="{ 'is-loading': loading }">
    <div class="table-wrapper">
      <table
        class="table"
        :class="tableClasses">
        <thead>
        <th class="checkbox-cell" v-if="checkable">
          <!--<b-checkbox v-model="allChecked"/>-->
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
            <!-- <b-checkbox :value="selected[row.id]" @change.native="toggleChecked(row.id)"/> -->
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
// import { Checkbox as BCheckbox } from 'buefy/src/components/checkbox'
export default {
  name: "ApplicationTable",
  data() {
    return {
      //selected: [...this.checkedRows]
      selected: {},
      boolAllChecked: false
    }
  },
  // components: {
  //   BCheckbox
  // },
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
      type: Object,
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
      // !Object.values(this.selected).some((value) =>
      //   false
      // )
      console.log(this.selected)
      return bool
    },
    toggleAllChecked() {
      let value = !this.isAllChecked();
      this.rows.forEach((row) =>
        this.selected[row.id] = value
      )
    },
    // isChecked(rowId) {
    //   this.selected[rowId] !== false
    //   console.log('isChecked')
    // },
    toggleChecked(rowId) {
      this.selected[rowId] = this.selected[rowId] === false;
      console.log(this.selected)
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
  // mounted() {
  //   var selected = {}
  //   // for(var i = 0; i < 6000; i++) {
  //   //   selected[i] = false;
  //   // }
  //   // this.rows.forEach((row) =>
  //   //   selected[row.id] = false
  //   // )
  //   this.selected = selected
  //   console.log(this.selected)
  // },
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
    // checked: {
    //   get() {
    //     this.selected[rowId] !== false
    //     console.log('isChecked')
    //   },
    //   set(value) {
    //     this.selected[rowId] = value ? true : false
    //     console.log(this.selected)
    //   }
    // },
    allChecked: {
      get() {
        console.log('allChecked.get')
        this.isAllChecked()
        return this.boolAllChecked
      },
      set(value) {
        value = !!value
        this.rows.forEach((row) =>
          this.selected[row.id] = value
        )
        this.boolAllChecked = value
        console.log('allChecked.set')
      }
    },
    // selectAll: {
    //   get: function () {
    //     console.log('hi')
    //     return this.rows ? this.selected.length == this.rows.length : false;
    //   },
    //   set: function (value) {
    //     console.log('set')
    //     var selected = [];
    //     if (value) {
    //       this.rows.forEach(function (row) {
    //         selected.push(row.id);
    //       });
    //     }
    //     this.selected = selected;
    //     console.log(selected)
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
