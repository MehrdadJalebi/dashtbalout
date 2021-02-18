import Vue from 'vue'
import APP_CONFIG from './config'
import App from './app.vue'
import './registerServiceWorker'
import router from './router/index.js'
import store from './store'
import Vuetify from './plugins/vuetify'
import asazan from '@/plugins/asazan'
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
if (token) {
  store.commit('auth/setToken', token)
}

router.beforeEach((to, from, next) => {
  window.CURRENT_ROUTE_ROLES = to.meta.roles
  if (GetToken()) {
    next()
  } else if (!token &&
    to.path !== '/forgetpass' &&
    to.path !== '/emailactivated' &&
    to.path !== '/emailactivationfailed' &&
    to.path !== '/resetPassword' &&
    to.path !== '/termsandconditions' &&
    to.path !== '/advertiser/register' &&
    to.path !== '/advertiser/resetPasswordDetails' &&
    to.path !== '/advertiser/forgotPasswordDetails' &&
    to.path !== '/advertiser/authenticationDetails' &&
    to.path !== '/publisher/register' &&
    to.path !== '/publisher/resetPasswordDetails' &&
    to.path !== '/publisher/forgotPasswordDetails' &&
    to.path !== '/publisher/authenticationDetails' &&
    to.path !== '/register' &&
    to.path !== '/login') {
    router.push('/login')
  } else {
    next()
  }
})
const requestInterceptor = (config) => {
  config.headers.common.authorization = store.getters['auth/token']
  return config
}

const responseInterceptor = function (response) {
  const responseStatus = response.response ? response.response.status : null
  if (responseStatus === 401) {
    store.dispatch('auth/logout')
      .then(() => {
        // Patch expired token issue
        window.location = '/login'
      })
  }
  if (responseStatus === 403) {
    const errorMessage = APP_CONFIG.locales[APP_CONFIG.locale].errorMessages.forbidden
    store.dispatch('snackbar/showToastMessage', { content: errorMessage, color: 'error' })
    return Promise.reject(response)
  }
  if (responseStatus === 400) {
    return Promise.reject(response)
  }
  if (responseStatus === 500) {
    return Promise.reject(response)
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 800)
  })
    .then(() => {
      return response
    })
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
  asazan,
  vuetify,
  render: h => h(App)
}).$mount('#app')
