<route>
{
  "name": "profile",
  "meta": {
    "order": 13,
    "isVisible": false,
    "iconName": "mdi-account"
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.profile.title')"
    />
    <member-info
      :avatar="avatarImage"
      :name="name"
      :email="email"
      :description="$t('pages.profile.userProfile')"
    />
    <v-container>
      <v-row
        alignment="center"
        justify="center"
      >
        <v-col
          xs="12"
          md="6"
        >
          <profile-info-card
            :title="$t('pages.profile.personalInfo')"
            :description="$t('pages.profile.personalDescription')"
            :link-text="$t('pages.profile.personalLinkText')"
            icon="mdi-account-edit"
            link-url="editUserInfos"
          />
        </v-col>
      </v-row>
      <v-row
        alignment="center"
        justify="center"
      >
        <v-col
          xs="12"
          md="6"
        >
            <profile-info-card
              :title="$t('pages.profile.avatar')"
              :description="$t('pages.profile.avatarDescription')"
              :link-text="$t('pages.profile.avatarLinkText')"
              icon="mdi-account-circle"
              link-url="profilePhoto"
            />
        </v-col>
      </v-row>
      <v-row
        alignment="center"
        justify="center"
      >
        <v-col
          xs="12"
          md="6"
        >
          <profile-info-card
            :title="$t('pages.profile.changePassword')"
            :description="$t('pages.profile.changePasswordDescription')"
            :link-text="$t('pages.profile.changePasswordLinkText')"
            icon="mdi-lock"
            link-url="changePassword"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    profile () {
      return this.$store.state.layout.profile
    },
    avatarImage () {
      return this.userInfo.avatarImage ? this.userInfo.avatarImage : '/img/default-avatar.jpg'
    },
    email () {
      return this.userInfo ? this.userInfo.email : ''
    },
    name () {
      return this.userInfo ? this.userInfo.fullName : '-'
    }
  },
  created () {
    this.getUser().then(response => {
      this.userInfo = response.data
      console.log(this.userInfo)
    })
  },
  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      showToast: 'snackbar/showToastMessage'
    })
  }
}
</script>
