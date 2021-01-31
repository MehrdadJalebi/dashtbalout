import Vue from 'vue'
import Login from '../components/login.vue'
import AuthenticationDetails from '../components/authenticationDetails.vue'
import ChangePassword from '../components/changePassword.vue'
import Forgotpass from '../components/forgotpass.vue'
import Registration from '../components/registration.vue'
import PageTitle from '../components/page-title.vue'
import ProfileInfoCard from '../components/profile-info-card.vue'
import MemberInfo from '../components/member-info.vue'
import FormItem from '../components/form-item'
import FormAction from '../components/form-action'
import FilterBox from '../components/filter-box'
import FilterItem from '../components/filter-item'
import Starter from '../components/starter.vue'
import FormHelpBox from '../components/form-help-box.vue'
import GlobalSnackbar from '../components/global-snackbar.vue'
import PasswordVerification from '../components/password-verification.vue'
import UnderConstruction from '../components/under-construction.vue'
import Loading from '../components/loading.vue'
import ConfirmBox from '../components/confirm-box.vue'
import chat from '../components/chat.vue'

Vue.use({
  install (Vue, options) {
    Vue.component('Login', Login)
    Vue.component('AuthenticationDetails', AuthenticationDetails)
    Vue.component('ChangePassword', ChangePassword)
    Vue.component('Forgotpass', Forgotpass)
    Vue.component('Registration', Registration)
    Vue.component('PageTitle', PageTitle)
    Vue.component('ProfileInfoCard', ProfileInfoCard)
    Vue.component('MemberInfo', MemberInfo)
    Vue.component('FilterBox', FilterBox)
    Vue.component('FilterItem', FilterItem)
    Vue.component('FormItem', FormItem)
    Vue.component('FormItem', FormItem)
    Vue.component('FormAction', FormAction)
    Vue.component('Starter', Starter)
    Vue.component('FormHelpBox', FormHelpBox)
    Vue.component('GlobalSnackbar', GlobalSnackbar)
    Vue.component('PasswordVerification', PasswordVerification)
    Vue.component('UnderConstruction', UnderConstruction)
    Vue.component('Loading', Loading)
    Vue.component('ConfirmBox', ConfirmBox)
    Vue.component('chat', chat)
  }
})
