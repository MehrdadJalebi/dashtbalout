<route>
{
  "name": "register",
  "meta": {
    "order": 6,
    "isVisible": false,
    "iconName": "mdi-login",
    "artwork": "/img/samples/auth-artwork.png"
    }
}
</route>
<template>
  <registration
    login-route="login"
    :is-dark=true
    :is-loading="isLoading"
    :solo=true
    :outlined=false
    :icon-enabled=true
    :email-required-enabled=false
    @register="onRegister"
  />
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
      register: 'auth/registerWithToken',
      userNameExist: 'users/userNameExist',
      mobileExist: 'users/mobileExist',
      emailExist: 'users/emailExist',
      getUserInfo: 'auth/getUserInfo',
      showToast: 'snackbar/showToastMessage'
    }),
    onRegister (payload) {
      console.log('ertert is: ', payload)
      this.isLoading = true
      this.userNameExist({ username: payload.username }).then(usernameResponse => {
        if (usernameResponse.data) {
          const errorMessage = this.$t('pages.users.userNameExist')
          this.showToast({ content: errorMessage, color: 'error' })
          this.isLoading = false
        } else {
          if (payload.email) {
            this.emailExist({ email: payload.email }).then(emailResponse => {
              if (emailResponse.data) {
                const errorMessage = this.$t('pages.users.emailExist')
                this.showToast({ content: errorMessage, color: 'error' })
                this.isLoading = false
              }
            })
          }
          this.mobileExist({ mobile: payload.phoneNumber }).then(mobileResponse => {
            if (mobileResponse.data) {
              const errorMessage = this.$t('pages.users.mobileExist')
              this.showToast({ content: errorMessage, color: 'error' })
              this.isLoading = false
            } else {
              this.register(payload)
                .then(response => {
                  const successMessage = this.$t('pages.users.userRegisteredSuccessfully')
                  this.showToast({ content: successMessage, color: 'success' })
                  if (localStorage.token) {
                    this.getUserInfo().then(() => {
                      this.$router.push({ name: 'userPayrolls' })
                      window.dispatchEvent(new Event('UPDATE_AUTHORIZATION'))
                    })
                  } else {
                    this.$router.push({ name: 'login' })
                  }
                  this.isLoading = false
                })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .v-input__control{
    flex-direction: row;
  }
</style>
