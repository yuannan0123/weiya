import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalcount: '',
    modelShow: false
  },
  mutations: {

    getUpdatacountMutations (state, res) {
      state.totalcount = res
    }
  },
  actions: {
    getUpdatacountActions (context, res) {
      context.commit('getUpdatacountMutations', res)
    }
  }
})
