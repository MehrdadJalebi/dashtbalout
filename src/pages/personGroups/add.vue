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
            <label class="typo__label">
              <v-icon>mdi-account-group</v-icon>
              {{ $t('enums.personsList') }}
            </label>
            <multiselect
              v-model="personGroupPersons"
              :options="userList"
              :multiple="true"
              :close-on-select="false"
              :preserve-search="true"
              :placeholder="$t('enums.placeholders.personsList')"
              :select-label="$t('multiselect.selectLabel')"
              :selected-label="$t('multiselect.selectedLabel')"
              :deselect-label="$t('multiselect.deselectLabel')"
              label="text"
              track-by="text"
              :preselect-first="true"
            >
            <template #noResult>{{ $t('multiselect.noResult') }}</template>
            </multiselect>
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
import Multiselect from 'vue-multiselect'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  components: { Multiselect },
  data () {
    return {
      isLoading: false,
      personGroup: {},
      personGroupPersons: [],
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
        return { text: user.fullName, value: user.personId }
      })
    },
    add () {
      this.isLoading = true
      const personIds = this.personGroupPersons.map((person) => {
        return person.value
      })
      const payload = {
        groupName: this.personGroup.groupName,
        personIds: personIds
      }
      if (this.personGroup.groupName && personIds.length) {
        this.addPersonGroup(payload)
          .then((res) => {
            const successMessage = this.$t('pages.personGroups.personGroupAddedSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
            this.$router.push({ name: 'personGroups' })
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
