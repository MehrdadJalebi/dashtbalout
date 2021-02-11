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
      return this.server.GetPayroll({
        PageIndex: payload.pageIndex,
        PageSize: payload.pageSize
      })
    },
    addPayroll (context, payload) {
      return this.server.AddPayroll(payload)
    },
    download (context, payload) {
      return this.server.Download(payload)
    },
    addGroupPayroll (context, payload) {
      return this.server.AddGroupPayroll(payload)
    }
  }
}
