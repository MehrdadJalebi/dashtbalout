<route>
{
  "name": "admin",
  "meta": {
    "order": 1.1,
    "isVisible": false,
    "iconName": "mdi-play",
    "roles": ["ADMIN"]
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.starter.title')"
    ></page-title>
    <starter />
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>
