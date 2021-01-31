<route>
{
  "name": "changes",
  "meta": {
    "order": 20,
    "isVisible": false,
    "iconName": "mdi-file-document-edit"
  }
}
</route>
<template>
  <div class="changes text-end">
    <vue-markdown :source="changelog"></vue-markdown>
  </div>
</template>
<script>
import CHANGELOG from '../../CHANGELOG.md'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Changes',
  layout: APP_CONFIG.layout.mainPanelLayout,
  components: {
    VueMarkdown
  },
  data () {
    return {
      changelog: CHANGELOG
    }
  }
}
</script>
