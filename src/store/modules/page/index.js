const state = {
  title: null,
  appName: document.title
}

const mutations = {
  setPageTitle(state, value) {
    state.title = value
    if (!value)
      value = [state.appName]
    if (!Array.isArray(value))
      value = [value]
    document.title = titleify(state.title)

    // Show loading indicator if subtitle is missing
    if (!value[value.length - 1])
      document.title = 'Loading…'
  },

  setPageSubtitle(state, value) {
    state.title[state.title.length - 1] = value
    document.title = titleify(state.title)

    // Reactivity hack
    state.title = state.title.slice()
  }
}

export default {
  state,
  mutations
}

function titleify(input) {
  return input.slice().reverse().join(' - ')
}
