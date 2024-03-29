import Vue from 'vue'
import Vuex from 'vuex'
import pile from './modules/pile'
import store from './modules/store'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    store,
    pile
  },
  strict: debug,
})
