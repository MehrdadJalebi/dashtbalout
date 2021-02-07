<route>
{
  "name": "logout",
  "meta": {
    "order": 7,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  created () {
    this.logout()
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>
