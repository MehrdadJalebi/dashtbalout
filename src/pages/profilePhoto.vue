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
      ></form-item>
      <form-action
        :loading="fileLoading"
        :submit-text="$t('pages.forms.sendButtonText')"
        :cancel-text="$t('pages.forms.returnButtonText')"
        novalidate
        @submit="uploadProfilePic"
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
    fileId: null,
    fileList: [],
    fileLoading: false
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo'
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
      saveProfilePic: 'users/saveProfilePic',
      showToast: 'snackbar/showToastMessage'
    }),
    uploadProfilePic () {
      this.fileLoading = true
      this.fileList.push(this.avatarFile)
      this.saveProfilePic(this.fileList).then(response => {
        if (response.status === 200) {
          const successMessage = this.$t('toasts.avatarChangedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.fileLoading = false
        }
      })
    }
  }
}
</script>
