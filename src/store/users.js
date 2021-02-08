export default {

  namespaced: true,
  state: {
    users: []
  },
  getters: {
    users (state) {
      return state.users
    }
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
    }
  },
  actions: {
    addUser (context, payload) {
    },
    getAllUsers (context, payload) {
      return this.server.GetAll({
        PageIndex: payload.pageIndex,
        PageSize: payload.pageSize
      })
    },
    editUser (context, payload) {
    },
    register (context, payload) {
      return this.server.Register(payload)
    },
    update (context, payload) {
      return this.server.Update(payload)
    }
  }
}
