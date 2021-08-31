export default {

  namespaced: true,
  state: {
    user: {},
    users: [],
    last5Users: [],
    hasUsersSucceeded: false
  },
  getters: {
    users (state) {
      return state.users
    },
    user (state) {
      return state.user
    },
    last5Users (state) {
      return state.last5Users
    },
    hasUsersSucceeded (state) {
      return state.hasUsersSucceeded
    }
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
    },
    setUser (state, data) {
      state.user = data
    },
    setLast5Users (state, data) {
      state.last5Users = data
    },
    setHasUsersSucceeded (state, data) {
      state.hasUsersSucceeded = data
    }
  },
  actions: {
    getAllUsers (context, payload) {
      context.commit('setHasUsersSucceeded', false)
      return this.server.GetAll({
        Search: payload.search,
        UserStatus: payload.userType,
        PageIndex: payload.pageIndex,
        PageSize: payload.pageSize,
        SortType: payload.sortType
      })
        .then((response) => {
          context.commit('setHasUsersSucceeded', true)
          const userData = response.data
          if (!payload.sortType) {
            context.commit('setUsers', userData)
          } else {
            context.commit('setLast5Users', userData)
          }
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
    },
    saveProfilePic (context, payload) {
      return this.server.SaveProfilePic(payload)
    },
    getProfilePic (context, payload) {
      return this.server.GetProfilePic(payload)
    },
    deleteUser (context, payload) {
      return this.server.Delete(payload)
    },
    resetPassword (context, payload) {
      return this.server.ResetPassword(payload)
    },
    changePassword (context, payload) {
      return this.server.ChangePassword(payload)
    },
    getUserCount (context, payload) {
      return this.server.GetUserCount(payload)
    },
    getContractCount (context, payload) {
      return this.server.GetContractCount(payload)
    },
    getPayrollCount (context, payload) {
      return this.server.GetPayrollCount(payload)
    }
  }
}
