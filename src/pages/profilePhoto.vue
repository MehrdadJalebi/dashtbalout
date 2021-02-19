<route>
{
  "name": "profilePhoto",
  "meta": {
    "order": 7,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>

<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.profilePhoto.title')"
    ></page-title>
    <v-form
      v-model="formIsValid"
      class="form-horizontal"
    >
      <form-item
        v-model="avatarFile"
        :loading="fileLoading"
        type="file"
        :rules="avatarRules"
        icon="mdi-image-outline"
        accept="image/*"
        :label="$t('pages.profilePhoto.photo')"
        :placeholder="$t('pages.profilePhoto.photoPlaceholder')"
        @input="uploadFile"
      ></form-item>
      <form-action
        :submit-text="$t('pages.forms.sendButtonText')"
        :cancel-text="$t('pages.forms.returnButtonText')"
        novalidate
        @submit="onSubmitForm"
      ></form-action>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'panel',
  data: () => ({
    formIsValid: true,
    avatarFile: null,
    fileLoading: false,
    formData: {
      avatarAttachment: null
    }
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
      files: 'cdn/files'
    }),
    avatarRules () {
      return [
        v => !!v || this.$t('pages.profilePhoto.avatarAttachmentRequired'),
        v => (typeof v === 'string' || (!!v && ['image/jpeg', 'image/pjpeg', 'image/png'].includes(v.type))) || this.$t('validations.fileImageWhiteList')
      ]
    }
  },
  methods: {
    ...mapActions({
      setAvatar: 'profile/setAvatar',
      upload: 'cdn/upload'
    }),
    onSubmitForm () {
      this.setAvatar(this.formData)
        .then(() => {
          this.$router.push({ name: 'profile' })
        })
    },
    uploadFile () {
      if (this.avatarFile) {
        this.fileLoading = true
        this.upload(this.avatarFile)
          .then(() => {
            this.formData.avatarAttachment = this.files[0].fileName
            this.fileLoading = false
          })
          .catch(() => {
            this.fileLoading = false
          })
      }
    }
  },
  created () {
    this.avatarFile = this.userInfo.avatar ? this.getFileURL(this.userInfo.avatar) : null
  }
}
</script>
