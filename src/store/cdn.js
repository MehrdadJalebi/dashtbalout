export default {

  namespaced: true,
  actions: {
    upload (context, payload) {
      return this.server.Upload(payload)
    },
    ticket (context, payload) {
      return this.server.Ticket(payload)
    },
    download (context, payload) {
      return this.server.Download(payload)
    }
  }
}
