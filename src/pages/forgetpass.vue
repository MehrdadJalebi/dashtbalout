<route>
{
  "name": "forgotpass",
  "meta": {
    "order": 7,
    "isVisible": false,
    "iconName": "mdi-lock-open",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <forgotpass
    :email-enabled="false"
    :is-dark=true
    register-route="register"
    :solo=true
    :password-title="newPasswordTitle"
    :password-enabled="hasPin"
    :pin-enabled="hasPin"
    :is-loading="isLoading"
    :outlined=false
    :icon-enabled=true
    :backButtonEnabled="true"
    @forgotpass="forgotpass" />
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'twoside',
  data () {
    return {
      isLoading: false,
      hasPin: false,
      newPasswordTitle: this.$t('components.forgotPassword.newPassword')
    }
  },
  methods: {
    ...mapActions({
      confirm: 'auth/confirm',
      forgotPassword: 'auth/forgotPassword',
      showToast: 'snackbar/showToastMessage'
    }),
    forgotpass (payload) {
      this.isLoading = true
      if (!this.hasPin) {
        this.forgotPassword({ phoneNumber: payload.phoneNumber }).then(response => {
          if (response.status === 200) {
            this.hasPin = true
          }
          this.isLoading = false
        })
      } else {
        payload.pinCode = payload.pin.toString()
        this.confirm(payload).then(response => {
          if (response.status === 200) {
            const successMessage = this.$t('pages.users.passwordRecoverdSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
            this.$router.push({ name: 'login' })
          }
          this.isLoading = false
          // eslint-disable-next-line
        }, error => {
          const errorMessage = this.$t('toasts.invalidValues')
          this.showToast({ content: errorMessage, color: 'error' })
          this.isLoading = false
        })
      }
    }
  }
}
</script>
