<route>
{
  "name": "addPersonGroups",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left",
    "roles": ["User", "Admin", "SuperUser"]
  }
}
</route>
<template>
  <div class="mt-5 mx-5">
      <v-card>
        <v-card-title>{{$t('pages.personGroups.add')}}</v-card-title>
        <v-row
          class="px-3"
          >
          <v-col
            :sm="4"
            >
            <form-item
              v-model="personGroup.groupName"
              type="textbox"
              icon="mdi-account-group"
              :label="$t('enums.groupName')"
              :rules="[rules.required]"
              :placeholder="$t('enums.placeholders.groupName')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="personGroup.personsList"
              type="autocomplete"
              multiple
              :items="userList"
              icon="mdi-account-group"
              :rules="[rules.required]"
              :label="$t('enums.personsList')"
              :placeholder="$t('enums.placeholders.personsList')"
              ></form-item>
          </v-col>
            <v-col
              v-if="userListLoading"
              class="d-flex align-self-center mt-5"
              :sm="1"
              >
              <v-progress-circular
                indeterminate
                color="primary"
                :value="20"
                />
            </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 ml-1 mt-2 mr-auto"
              color="success"
              :loading="isLoading"
              @click="add"
              >
              {{ $t('pages.personGroups.addPersonGroupBtn') }}
            </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      isLoading: false,
      personGroup: {},
      userList: [],
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      }
    }
  },
  computed: {
    ...mapGetters({
      allUsers: 'users/users',
      hasUsersSucceeded: 'users/hasUsersSucceeded'
    }),
    userListLoading () {
      return !this.hasUsersSucceeded
    }
  },
  watch: {
    allUsers: {
      handler (newVal) {
        this.setUserList()
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      addPersonGroup: 'personGroups/addPersonGroup',
      addPersons: 'personGroups/addPersons',
      showToast: 'snackbar/showToastMessage'
    }),
    async setUserList () {
      this.userList = await this.allUsers.map(user => {
        return { text: user.fullName, value: user.id }
      })
    },
    add () {
      this.isLoading = true
      const payload = {
        groupName: this.personGroup.groupName
      }
      if (this.personGroup.groupName && this.personGroup.personsList.length) {
        this.addPersonGroup(payload)
          .then((res) => {
            console.log('ressss is: ', res)
            const successMessage = this.$t('pages.personGroups.personGroupAddedSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
            this.$router.push({ name: 'personGroups' })
            /*            this.addPersons(personsPayload)
              .then(() => {
              const successMessage = this.$t('pages.personGroups.personGroupAddedSuccessfully')
              this.showToast({ content: successMessage, color: 'success' })
              this.$router.push({ name: 'personGroups' })
            })
              .catch((err) => {
                const errorMessage = err.response.data.error
                this.showToast({ content: errorMessage, color: 'error' })
              }) */
          })
          .catch((err) => {
            const errorMessage = err.response.data.error
            this.showToast({ content: errorMessage, color: 'error' })
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        const errorMessage = this.$t('toasts.fillFields')
        this.showToast({ content: errorMessage, color: 'error' })
        this.isLoading = false
      }
    }
  }
}
</script>
