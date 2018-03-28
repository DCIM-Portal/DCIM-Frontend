import ApiService from '@/common/api.service'

const state = {
  tableData: []
}

const getters = {
  getTableData(state) {
    return state.tableData
  }
}

const actions = {
  fetchStoreCollection(context) {
    ApiService
      .get(this.state.route.meta.apiPath)
        .then(res => {
          console.log(res)
          context.commit('setTableData', {list: res.data.data})
        })
        .catch(error => {
          console.log(error)
        })
  }
}

const mutations = {
  setTableData(state, { list }) {
    state.tableData = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
