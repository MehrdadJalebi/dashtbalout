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
    getMessages (context, payload) {
      return this.server.GetMessages()
    },
    editMessage (context, payload) {
    },
    readed (context, payload) {
      return this.server.Readed(payload)
    },
    update (context, payload) {
      return this.server.Update(payload)
    },
    addMessageByUserId (context, payload) {
      return this.server.AddMessageByUserId(payload)
    }
  }
}
