export default {

  namespaced: true,
  state: {
    messages: []
  },
  actions: {
    addMessage (context, payload) {
    },
    getMessages (context, payload) {
      return this.server.GetMessages()
    },
    readed (context, payload) {
      return this.server.Readed(payload)
    },
    addMessageByUserId (context, payload) {
      return this.server.AddMessageByUserId(payload)
    },
    getMessagesByUserId (context, payload) {
      return this.server.GetMessageByUserId(payload)
    }
  }
}
