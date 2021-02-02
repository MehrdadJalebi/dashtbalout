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
    getUsers (context) {
      return this.server.GetUsers(query)
        .then(response => {
          const users = response.data.result
          context.commit('setUsers', users)
        })
    },
    editUser (context, payload) {
    }
  }
}
