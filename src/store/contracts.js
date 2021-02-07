export default {

  namespaced: true,
  state: {
    contracts: []
  },
  getters: {
    contracts (state) {
      return state.contracts
    }
  },
  mutations: {
    setContracts (state, data) {
      state.contracts = data
    }
  },
  actions: {
    addContract (context, payload) {
    },
    getAllContracts (context, payload) {
      // return this.server.GetAllContracts({
      // PageIndex: payload.pageIndex,
      // PageSize: payload.pageSize
      // })
      return this.server.GetAllContracts()
    },
    editContract (context, payload) {
    }
  }
}
