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
    getBankAccountByUserId (context, payload) {
      return this.server.GetBankAccountByUserId(payload)
    },
    getAllBankAccounts (context, payload) {
      return this.server.GetAll({
        PageIndex: payload.pageIndex,
        PageSize: payload.pageSize
      })
    },
    getBankAccount (context, payload) {
      return this.server.GetBankAccount(payload)
    },
    addBankAccount (context, payload) {
      return this.server.AddBankAccount(payload)
    },
    removeBankAccount (context, payload) {
      return this.server.RemoveBankAccount(payload)
    },
    updateBankAccount (context, payload) {
      return this.server.UpdateBankAccount(payload)
    }
  }
}
