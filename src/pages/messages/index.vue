<route>
{
  "name": "messages",
  "meta": {
    "order": 4.01,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.messages.title')"
    >
    </page-title>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>
