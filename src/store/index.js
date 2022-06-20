import Vue from 'vue'
import Vuex from 'vuex'
import layout from './layout'
import auth from './auth'
import users from './users'
import contracts from './contracts'
import leaves from './leaves'
import bankAccounts from './bankAccounts'
import payrolls from './payrolls'
import messages from './messages'
import cdn from './cdn'
import enums from './enums'
import snackbar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    users,
    contracts,
    leaves,
    bankAccounts,
    payrolls,
    messages,
    cdn,
    enums,
    snackbar
  }
})
