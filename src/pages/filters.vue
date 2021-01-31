<route>
{
  "name": "filters",
  "meta": {
    "order": 7,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.starter.title')"
    ></page-title>
    {{ '2020-08-30T22:22:19.8631962' | date }}
    <br/>
    {{ '2020-08-30T22:22:19.8631962' | dateTime }}
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>
