<route>
{
  "name": "confirmModal",
  "meta": {
    "order": 20,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.confirmModal.title')"
    ></page-title>
    <v-btn
      text
      class="primary--text text-caption"
      @click="toggleModal()"
    >
      {{ $t('pages.confirmModal.showModal') }}
    </v-btn>
    <v-dialog
      v-model="isModalVisible"
      max-width="780px"
    >
      <confirm-box
        :confirm-title="$t('pages.confirmModal.confirmTitle')"
        :confirm-message="$t('pages.confirmModal.confirmMessage')"
        confirm-message-icon="mdi-alert"
        :confirm-button-text="$t('pages.confirmModal.confirm')"
        :cancel-button-text="$t('pages.confirmModal.cancel')"
        @confirm="toggleModal()"
        @cancel="isModalVisible = false"
      />
    </v-dialog>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    toggleModal () {
      this.isModalVisible = !this.isModalVisible
    }
  }
}
</script>
