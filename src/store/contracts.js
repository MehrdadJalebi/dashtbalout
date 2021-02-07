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
      return this.server.AddContract(payload)
    },
    getAllContracts (context, payload) {
      return this.server.GetAllContracts()
    },
    getContractById (context, payload) {
      return this.server.GetContractById(payload)
    },
    updateContract (context, payload) {
      return this.server.UpdateContract(payload)
    }
  }
}
