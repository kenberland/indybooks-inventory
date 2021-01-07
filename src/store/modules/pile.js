const state = () => ({
  books: [],
})

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  books (state, books) {
    state.books = books;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
