<route>
{
  "name": "addUsers",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.users.add')"
    >
    </page-title>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>
