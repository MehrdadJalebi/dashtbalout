<route>
{
  "name": "login",
  "meta": {
    "order": 5,
    "isVisible": false,
    "iconName": "mdi-email",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <login
    ref="login"
    :emailEnabled="false"
    :is-loading="isLoading"
    :is-dark=true
    forgot-password-route="forgotpass"
    register-route="register"
    :solo=true
    :outlined=false
    :rememberMeEnabled="false"
    :icon-enabled=true
    @login="onLogin" />
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
      login: 'auth/login',
      getUserInfo: 'auth/getUserInfo'
    }),
    onLogin (payload) {
      this.isLoading = true
      this.login(payload)
        .then(() => {
          this.isLoading = false
          if (localStorage.token) {
            this.getUserInfo().then(() => {
              if (this.userInfo.role === 'Admin') {
                this.$router.push({ name: 'index' })
              } else {
                this.$router.push({ name: 'index' })
              }
              window.dispatchEvent(new Event('UPDATE_AUTHORIZATION'))
            })
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.$refs.login.userInfo.rememberMe = false
  }
}
</script>
