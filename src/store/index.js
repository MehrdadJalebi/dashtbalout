import Vue from 'vue'
import Vuex from 'vuex'
import layout from './layout'
import auth from './auth'
import users from './users'
import enums from './enums'
import snackbar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    users,
    enums,
    snackbar
  }
})
