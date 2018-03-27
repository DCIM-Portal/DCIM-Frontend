<template>
  <table>
    <thead>
    <th v-for="column in columns" v-html="$t('tables.'+table_type+'.'+column, $t('tables.application.'+column, column))"></th>
    </thead>
    <tbody>
    <tr v-for="row in rows" v-html="rowToHtml(row)">
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "ApplicationTable",
    data() {
      return {
      }
    },
    props: {
      table_type: {
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
    },
    methods: {
      rowToHtml: function(row) {
        let out = '';
        this.columns.forEach((column) => {
            out += `<td>${row[column]}</td>`
          }
        );
        return out
      }
    }
  }
</script>

<style scoped>

</style>
