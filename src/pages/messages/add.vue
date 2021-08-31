<route>
{
  "name": "addPayrolls",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <v-card class="mt-5">
        <v-row
          class="px-3"
          >
          <v-col
            :sm="7"
            >
            <form-item
              v-model="message.userIds"
              type="autocomplete"
              :items="userList"
              multiple
              icon="mdi-account-circle"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
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
          <v-col
            :sm="7"
            >
            <form-item
              v-model="message.title"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.messageTitle')"
              :placeholder="$t('enums.placeholders.messageTitle')"
              ></form-item>
          </v-col>
          <v-col
            :sm="12"
            >
            <form-item
              v-model="message.body"
              type="textarea"
              rows="2"
              icon="mdi-account-circle"
              :label="$t('enums.messageBody')"
              :placeholder="$t('enums.placeholders.messageBody')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 mt-2 ml-1 mr-auto"
              color="success"
              @click="sendMessage"
              >
              {{ $t('enums.sendMessage') }}
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
      message: {
        userIds: [],
        title: null,
        body: null
      },
      userList: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      monthsArray: 'enums/monthsArray',
      allUsers: 'users/users',
      hasUsersSucceeded: 'users/hasUsersSucceeded'
    }),
    userListLoading () {
      return !this.hasUsersSucceeded
    }
  },
  watch: {
    allUsers: {
      handler () {
        this.setUserList()
      },
      deep: true
    }
  },
  created () {
    if (this.allUsers.length) {
      this.setUserList()
    }
  },
  methods: {
    ...mapActions({
      addMessageByUserId: 'messages/addMessageByUserId',
      showToast: 'snackbar/showToastMessage'
    }),
    sendMessage () {
      if (this.message.userIds.length && this.message.title && this.message.body) {
        this.addMessageByUserId(this.message).then(response => {
          const successMessage = this.$t('pages.messages.messageSendedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
        })
      } else {
        const errorMessage = this.$t('toasts.fillFields')
        this.showToast({ content: errorMessage, color: 'error' })
      }
    },
    setUserList () {
      this.isLoading = false
      this.userList = this.allUsers.map(user => {
        return { text: user.fullName, value: user.id }
      })
    }
  }
}
</script>
