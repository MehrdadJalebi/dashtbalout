<route>
{
  "name": "passwordVerification",
  "meta": {
    "title": "enter current password",
    "order": 9,
    "isVisible": true,
    "iconName": "mdi-login",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <PasswordVerification
    :is-dark=true
    :solo=true
    :outlined=false
    :icon-enabled=true
    @verifypassword="onVerifyPassword" />
</template>
<script>
export default {
  layout: 'twoside',
  methods: {
    onVerifyPassword (payload) {
      console.log('Do verify Password ---------------- !!!!')
      console.log(payload.password)
      this.$router.push({ name: 'changePassword' })
    }
  }
}
</script>
