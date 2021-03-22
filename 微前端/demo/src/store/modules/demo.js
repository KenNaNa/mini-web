// initial state
const state = {
  name: 'a',
}

const mutations = {
  oaedit(state, params) {
    state.name = state.name + '-' + (params ? params.age : 5)
  },
}

const actions = {
  edit({ commit }, params) {
    commit('oaedit',params);
  },
}

const getters = {
  add: (state) => (params) => {
    return state.name + params.age
  }
}

/**
 * 参考：https://vuex.vuejs.org/zh/api/#getters
 * Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
 * 且只有当它的依赖值发生了改变才会被重新计算。
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
