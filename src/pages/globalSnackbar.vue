<route>
{
  "name": "globalSnackbar",
  "meta": {
    "order": 19,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.globalSnackbar.title')"
    ></page-title>
    <v-btn color="primary" @click="showSnackbar">
        {{ $t('pages.globalSnackbar.showSnackbar') }}
    </v-btn>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  methods: {
    showSnackbar () {
      this.$store.dispatch('snackbar/showToastMessage', { content: 'hello', color: 'info' })
    }
  }
}
</script>
