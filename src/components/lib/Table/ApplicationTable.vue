<template>
  <div class="b-table" :class="{ 'is-loading': loading }">
    <div class="table-wrapper">
      <table
        class="table"
        :class="tableClasses">
        <thead>
        <th class="checkbox-cell" v-if="checkable">
          <!-- <b-checkbox v-model="allChecked"/> -->
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
            <input type="checkbox" v-model="selected[row.id]" @click="toggleChecked(row.id)" :value="row.id" :key="row.id">
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
//import { Checkbox as BCheckbox } from 'buefy/src/components/checkbox'
export default {
  name: "ApplicationTable",
  data() {
    return {
      //selected: [...this.checkedRows]
      selected: {}
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
    // isAllChecked() {
    //   !Object.values(this.selected).some((value) =>
    //     false
    //   )
    //   console.log(this.selected)
    // },
    toggleAllChecked() {
      var value = this.isAllChecked() ? false : true
      this.rows.forEach((row) =>
        this.selected[row.id] = value
      )
    },
    // isChecked(rowId) {
    //   this.selected[rowId] !== false
    //   console.log('isChecked')
    // },
    toggleChecked(rowId) {
      if (this.selected[rowId] !== false) {
        this.selected[rowId] = false
      } else {
        this.selected[rowId] = true
      }
      console.log(this.selected)
    }
  },
  watch: {
    rows(value) {
      value.forEach((row) =>
        this.$set(this.selected, row.id, false)
      )
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
        !Object.values(this.selected).some((value) =>
          false
        )
      },
      set(value) {
        value = value ? true : false
        this.rows.forEach((row) =>
          this.selected[row.id] = value
        )
          console.log('set: All Checked')
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
