export default {

  namespaced: true,
  state: {
    messages: []
  },
  getters: {
    messages (state) {
      return state.messages
    }
  },
  mutations: {
    setMessages (state, data) {
      state.messages = data
    }
  },
  actions: {
    addMessage (context, payload) {
    },
    getAllMessages (context, payload) {
      return this.server.GetAll({
        PageIndex: payload.pageIndex,
        PageSize: payload.pageSize
      })
    },
    editMessage (context, payload) {
    },
    register (context, payload) {
      return this.server.Register(payload)
    },
    update (context, payload) {
      return this.server.Update(payload)
    },
    addMessageByUserId (context, payload) {
      return this.server.AddMessageByUserId(payload)
    }
  }
}
