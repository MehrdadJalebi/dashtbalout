<route>
{
  "name": "index",
  "meta": {
    "order": 1,
    "isVisible": true,
    "iconName": "mdi-home"
  }
}
</route>
<template>
  <div class="home text-end">
  </div>
</template>

<script>
import README from '../../README.md'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Home',
  layout: APP_CONFIG.layout.mainPanelLayout,
  components: {
    VueMarkdown
  },
  data () {
    return {
      readme: README
    }
  }
}
</script>
