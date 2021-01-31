<route>
{
  "name": "persianNumber",
  "meta": {
    "order": 7,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.starter.title')"
    ></page-title>
    1234567890
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>
