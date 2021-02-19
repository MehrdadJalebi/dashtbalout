<route>
{
  "name": "changePassword",
  "meta": {
    "title": "change password",
    "order": 9,
    "isVisible": false,
    "iconName": "mdi-login",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <changePassword
    :is-dark=true
    :solo=true
    :outlined=false
    :icon-enabled=true
    @changepassword="onChangepassword" />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'twoside',
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo'
    })
  },
  methods: {
    ...mapActions({
      changePassword: 'users/changePassword',
      getUserInfo: 'auth/getUserInfo',
      showToast: 'snackbar/showToastMessage'
    }),
    onChangepassword (payload) {
      this.isLoading = true
      console.log(payload)
      this.changePassword(payload).then(response => {
        console.log(response)
        const successMessage = this.$t('toasts.passwordChangedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        if (localStorage.token) {
          this.getUserInfo().then(() => {
            if (this.userInfo.role === 'Admin') {
              this.$router.push({ name: 'index' })
            } else {
              this.$router.push({ name: 'userPayrolls' })
            }
            this.isLoading = false
          })
        } else {
          this.isLoading = false
          this.$router.push({ name: 'login' })
        }
        // eslint-disable-next-line
      }, error => {
        const errorMessage = this.$t('toasts.invalidValues')
        this.showToast({ content: errorMessage, color: 'error' })
        this.isLoading = false
      })
    }
  }
}
</script>
