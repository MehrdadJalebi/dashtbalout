<route>
{
  "name": "forgotpass",
  "meta": {
    "order": 7,
    "isVisible": true,
    "iconName": "mdi-lock-open",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <forgotpass
    :is-dark=true
    register-route="register"
    :solo=true
    :outlined=false
    :icon-enabled=true
    :backButtonEnabled="true"
    @forgotpass="forgotpass" />
</template>
<script>
export default {
  layout: 'twoside',
  methods: {
    forgotpass (payload) {
      console.log('Do Forgot Password ---------------- !!!!')
      console.log(payload.email)
    }
  }
}
</script>
