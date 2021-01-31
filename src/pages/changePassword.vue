<route>
{
  "name": "changePassword",
  "meta": {
    "title": "change password",
    "order": 9,
    "isVisible": true,
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
export default {
  layout: 'twoside',
  methods: {
    onChangepassword (payload) {
      console.log('Do Change Password ---------------- !!!!')
      console.log(payload.password)
    }
  }
}
</script>
