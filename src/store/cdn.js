export default {

  namespaced: true,
  actions: {
    upload (context, payload) {
      return this.server.Upload(payload)
    },
    uploadZip (context, payload) {
      return this.server.UploadZip(payload)
    },
    uploadXlsx (context, payload) {
      return this.server.ImportExcel(payload)
    },
    getExcel (context, payload) {
      return this.server.Get(payload)
    },
    ticket (context, payload) {
      return this.server.Ticket(payload)
    },
    download (context, payload) {
      return this.server.Download(payload)
    }
  }
}
