export default {

  namespaced: true,
  state: {
    bankAccounts: []
  },
  getters: {
    bankAccounts (state) {
      return state.bankAccounts
    }
  },
  mutations: {
    setBankAccounts (state, data) {
      state.bankAccounts = data
    }
  },
  actions: {
    addBankAccountByUserId (context, payload) {
      return this.server.AddBankAccountByUserId(payload)
    },
    getAllBankAccounts (context, payload) {
      return this.server.GetAll({
        PageIndex: payload.pageIndex,
        PageSize: payload.pageSize
      })
    },
    editBankAccount (context, payload) {
    },
    register (context, payload) {
      return this.server.Register(payload)
    },
    update (context, payload) {
      return this.server.Update(payload)
    }
  }
}
