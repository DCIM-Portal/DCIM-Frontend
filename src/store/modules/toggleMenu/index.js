const state = {
  menuIsActive: false
}

const mutations = {
  setMenuActive(state, value) {
    state.menuIsActive = value
  }
}

export default {
  state,
  mutations
}
