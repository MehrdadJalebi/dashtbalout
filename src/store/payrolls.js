export default {

  namespaced: true,
  state: {
    payrolls: []
  },
  getters: {
    payrolls (state) {
      return state.payrolls
    }
  },
  mutations: {
    setPayrolls (state, data) {
      state.payrolls = data
    }
  },
  actions: {
    getPayrollByUserId (context, payload) {
      return this.server.GetPayrollByUserId(payload)
    },
    getPayrolls (context, payload) {
      return this.server.GetPayroll()
    },
    addPayroll (context, payload) {
      return this.server.AddPayroll(payload)
    },
    download (context, payload) {
      return this.server.Download(payload)
    },
    delete (context, payload) {
      return this.server.DeletePayroll(payload)
    },
    deleteGroupPayrolls (context, payload) {
      return this.server.DeleteGroupPayroll(payload)
    },
    addGroupPayroll (context, payload) {
      return this.server.AddGroupPayroll(payload)
    }
  }
}
