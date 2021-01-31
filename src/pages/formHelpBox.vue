<route>
{
  "name": "formHelpBox",
  "meta": {
    "order": 18,
    "isVisible": false,
    "iconName": "mdi-help"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.formHelpBox.title')"
    ></page-title>
    <FormHelpBox
      img-src="/img/samples/artwork.png"
      :title="faker.lorem.words()"
      :description-html="faker.lorem.sentence() + '<br/>' + faker.lorem.sentence()"
      description-variant="error"
      :confirm-message="faker.lorem.words()"
      :caption="faker.lorem.words()"
      :is-button-visible="true"
      @clickButton="redirectToHome"
    >
    </FormHelpBox>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  methods: {
    redirectToHome () {
      this.$router.push({ name: 'profile' })
    }
  }
}
</script>
