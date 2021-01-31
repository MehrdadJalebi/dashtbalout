import Vue from 'vue'
import Vuex from 'vuex'
import layout from './layout'
import snackbar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    snackbar
  }
})
