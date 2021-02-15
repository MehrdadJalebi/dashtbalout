export default {

  namespaced: true,
  actions: {
    upload (context, payload) {
      return this.server.Upload(payload)
    },
    download (context, payload) {
      return this.server.Download(payload)
    }
  }
}
