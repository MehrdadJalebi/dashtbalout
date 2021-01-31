import Vue from 'vue'
import APP_CONFIG from './config'
import App from './app.vue'
import './registerServiceWorker'
import router from './router/index.js'
import store from './store'
import Vuetify from './plugins/vuetify'
import loris from '@/plugins/loris'
import globalMixin from '@/mixins/global'
import faker from 'faker'
import Server from '@/plugins/server'
import GetToken from '@/plugins/gettoken'
import PortalVue from 'portal-vue'
import Filters from '@/filters'
import Bowser from 'bowser'
import browserVersionCompatibility from '@/plugins/browser-compatibility'

const browser = Bowser && Bowser.getParser(window.navigator.userAgent)
const isValidBrowser = browser && browser.satisfies(APP_CONFIG.validBrowsers)
browserVersionCompatibility(isValidBrowser)

Vue.mixin(globalMixin)
Vue.use(PortalVue)
Filters(APP_CONFIG)

window.CURRENT_USER_ROLE = 'ADMIN'

Vue.mixin({
  beforeCreate () {
    faker.locale = APP_CONFIG.locale
    this.faker = faker
    this.APP_CONFIG = APP_CONFIG
  }
})

// NOTE: add route before hooks here
router.beforeEach((to, from, next) => {
  next()
})

const vuetify = Vuetify(APP_CONFIG)

const token = GetToken()

const requestInterceptor = (config) => {
  console.log('request interceptor')
  return config
}

const responseInterceptor = (response) => {
  console.log('response interceptor')
  return response
}

const server = Server(APP_CONFIG, token, requestInterceptor, responseInterceptor)

window.SERVER = server
window.APP_CONFIG = APP_CONFIG

store.server = server

Vue.server = server

Vue.config.productionTip = false

new Vue({
  router,
  store,
  loris,
  vuetify,
  render: h => h(App)
}).$mount('#app')
