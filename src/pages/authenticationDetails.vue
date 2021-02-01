<route>
{
  "name": "authenticationDetails",
  "meta": {
    "title": "authenticationDetails",
    "order": 10,
    "isVisible": false,
    "iconName": "mdi-login",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <authenticationDetails
    :title="$t('pages.authenticationDetails.registerTitle')"
    :description="$t('pages.authenticationDetails.registerDescription')"
    :details="registerDetails"
    title-text-color="green"
    button-route='login'
    />
</template>
<script>
export default {
  layout: 'twoside',
  data () {
    return {
    }
  },
  computed: {
    registerDetails () {
      return `${this.$t('pages.authenticationDetails.registerDetails')}\n${this.$t('pages.authenticationDetails.registerDetails1')}\n${this.$t('pages.authenticationDetails.registerDetails2')}\n${this.$t('pages.authenticationDetails.registerDetails3')}`
    }
  }
}
</script>
