import APP_CONFIG from '@/config.js'
import faker from 'faker'
faker.locale = APP_CONFIG.locale
export default {
  namespaced: true,
  state: {
    userInfo: {},
    token: null,
    password: null,
    refreshTokenInterval: null
  },
  getters: {
    userInfo (state) {
      return state.userInfo
    },
    token (state) {
      return `Bearer ${state.token}`
    },
    userId (state) {
      return state.userInfo.userId
    },
    role (state) {
      return state.userInfo.role
    },
    password (state) {
      return state.password
    }
  },
  mutations: {
    setToken (state, data) {
      state.token = data
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setPassword (state, data) {
      state.password = data
    }
  },
  actions: {
    login (context, payload) {
      return this.server.Authenticate({
        username: payload.userName,
        password: payload.password
      })
        .then((response) => {
          const tokenData = response.data
          return context.dispatch('setTokenInfo', tokenData)
        })
    },
    getUserInfo (context) {
      return this.server.GetUserInfo()
        .then((response) => {
          if (response.data) {
            const userInfo = response.data
            context.commit('setUserInfo', userInfo)
          }
        })
    },
    register (context, payload) {
      return this.server.Register(payload)
    },
    registerWithToken (context, payload) {
      return this.server.Register(payload)
        .then((response) => {
          const tokenData = response.data
          return context.dispatch('setTokenInfo', tokenData)
        })
    },
    confirm (context, payload) {
      return this.server.Confirm(payload)
    },
    forgotPassword (context, payload) {
      return this.server.ForgotPassword(payload)
    },

    init (context) {
      return context.dispatch('loginWithRefreshToken')
        .then((response) => {
          return context.dispatch('self')
        })
    },
    setTokenInfo (context, payload) {
      context.commit('setToken', payload.token)
      localStorage.setItem('token', payload.token)
    },
    setPassword (context, payload) {
      context.commit('setPassword', payload.password)
    },
    registerAdvertiser (context, payload) {
      return this.server.RegisterAdvertiser({
        firstName: payload.name,
        lastName: payload.lastName,
        mobileNumber: payload.phoneNumber,
        email: payload.email,
        password: payload.password
      })
        .then((response) => {
          return true
        })
    },
    registerPublisher (context, payload) {
      return this.server.RegisterPublisher({
        firstName: payload.name,
        lastName: payload.lastName,
        mobileNumber: payload.phoneNumber,
        email: payload.email,
        password: payload.password
      })
        .then((response) => {
          return true
        })
    },
    sendResetPasswordEmail (context, payload) {
      return this.server.SendResetPasswordEmail({
        username: payload.email
      })
        .then((response) => {
          return true
        })
    },
    resetPassword (context, payload) {
      return this.server.ResetPassword({
        token: payload.token,
        username: payload.email,
        password: payload.password
      })
        .then((response) => {
          return true
        })
    },
    logout (context) {
      localStorage.removeItem('token')
      context.commit('setToken', null)
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('rememberMeExpiryDate')
      clearInterval(context.state.refreshTokenInterval)
      context.dispatch('layout/updateProfile', {}, { root: true })
      window.location.href = window.location.origin
    },
    self (context) {
      const promise = this.server.Self()
      promise.then((response) => {
        if (response.data) {
          const userInfo = response.data.result
          userInfo.name = `${userInfo.firstName} ${userInfo.lastName}`
          if (userInfo.avatar) {
            userInfo.avatarImage = APP_CONFIG.cdnBaseURL + '/' + userInfo.avatar
            userInfo.avatar = APP_CONFIG.cdnBaseURL + '/' + userInfo.avatar
          }
          context.commit('setUserInfo', userInfo)
          context.dispatch('layout/updateProfile', userInfo, { root: true })
        }
      })
      return promise
    },
    verifyEmailAddress (context, payload) {
      return this.server.VerifyEmailAddress(payload)
    }
  }
}
