export default {

  namespaced: true,
  state: {
    personGroups: []
  },
  getters: {
    personGroups (state) {
      return state.personGroups
    }
  },
  mutations: {
    setPersonGroups (state, data) {
      state.personGroups = data
    }
  },
  actions: {
    addPersonGroup (context, payload) {
      return this.server.AddGroup(payload)
    },
    editPersonGroup (context, payload) {
      return this.server.UpdateGroup(payload)
    },
    deletePersonGroup (context, payload) {
      return this.server.DeleteGroup(payload)
    },
    getAllPersonGroups (context, payload) {
      return this.server.GetAllGroup(payload)
    },
    getPersonGroups (context, payload) {
      return this.server.GetGroup()
    },
    addPersons (context, payload) {
      return this.server.AddPersons(payload)
    },
    deletePersons (context, payload) {
      return this.server.DeletePersons(payload)
    },
    changePersonGroup (context, payload) {
      return this.server.ChangeGroup(payload)
    }
  }
}
