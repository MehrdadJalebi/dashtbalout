import Vue from 'vue'
import Vuex from 'vuex'
import layout from './layout'
import enums from './enums'
import snackbar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    enums,
    snackbar
  }
})
