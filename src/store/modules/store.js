const state = () => ({
  name: null,
  uuid: null
})

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  uuid (state, uuid) {
    state.uuid = uuid;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
