export default {

  namespaced: true,
  state: {
    leaves: []
  },
  getters: {
    leaves (state) {
      return state.leaves
    }
  },
  mutations: {
    setLeaves (state, data) {
      state.leaves = data
    }
  },
  actions: {
    addLeave (context, payload) {
      return this.server.AddLeave(payload)
    },
    getAllLeaves (context, payload) {
      return this.server.GetLeaves(payload)
    },
    getLeaves (context, payload) {
      return this.server.GetLeave()
    },
    approveLeave (context, payload) {
      return this.server.Approve(payload)
    },
    rejectLeave (context, payload) {
      return this.server.Reject(payload)
    },
    setBalance (context, payload) {
      return this.server.SetBalance(payload)
    },
    getBalance (context, payload) {
      return this.server.GetBalance(payload)
    }
  }
}
