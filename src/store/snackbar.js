export default {
  namespaced: true,
  state: {
    content: '',
    color: '',
    show: ''
  },
  mutations: {
    showMessage (state, payload) {
      state.content = payload.content
      state.color = payload.color
      state.show = true
    }
  },
  actions: {
    showToastMessage (context, payload) {
      context.commit('showMessage', payload)
    }
  }
}
