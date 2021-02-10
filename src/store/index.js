import Vue from 'vue'
import Vuex from 'vuex'
import layout from './layout'
import auth from './auth'
import users from './users'
import contracts from './contracts'
import bankAccounts from './bankAccounts'
import messages from './messages'
import enums from './enums'
import snackbar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    users,
    contracts,
    bankAccounts,
    messages,
    enums,
    snackbar
  }
})
