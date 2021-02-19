export default {

  namespaced: true,
  state: {
    user: {},
    users: []
  },
  getters: {
    users (state) {
      return state.users
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
    },
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    addUser (context, payload) {
    },
    getAllUsers (context, payload) {
      return this.server.GetAll({
        Search: payload.search,
        UserStatus: payload.userType,
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
    },
    updateByUserId (context, payload) {
      return this.server.UpdateByUserId(payload)
    },
    getUser (context, payload) {
      return this.server.GetUser(payload)
    },
    getUserByUserId (context, payload) {
      return this.server.GetByUserId(payload)
    },
    changeRole (context, payload) {
      return this.server.ChangeRole(payload)
    },
    disableUser (context, payload) {
      return this.server.Disable(payload)
    },
    enableUser (context, payload) {
      return this.server.Enable(payload)
    },
    userNameExist (context, payload) {
      return this.server.UsernameExist(payload)
    },
    mobileExist (context, payload) {
      return this.server.MobileExist(payload)
    },
    emailExist (context, payload) {
      return this.server.EmailExist(payload)
    },
    excel (context, payload) {
      return this.server.Excel(payload)
    }
  }
}
