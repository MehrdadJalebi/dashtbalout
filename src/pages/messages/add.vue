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
            :sm="12"
            >
            <form-item
              v-model="message.userIds"
              type="select"
              :items="userList"
              multiple
              icon="mdi-account-circle"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
              ></form-item>
          </v-col>
          <v-col
            :sm="12"
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
      monthsArray: 'enums/monthsArray'
    })
  },
  created () {
    const payload = {
      pageIndex: 1,
      pageSize: 100000
    }
    this.getAllUsers(payload)
      .then(response => {
        this.isLoading = false
        this.userList = response.data.map(user => {
          return { text: user.fullName, value: user.id }
        })
      })
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers',
      addMessageByUserId: 'messages/addMessageByUserId',
      showToast: 'snackbar/showToastMessage'
    }),
    sendMessage () {
      this.addMessageByUserId(this.message).then(response => {
        const successMessage = this.$t('pages.messages.messageSendedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        console.log(response)
      })
    }
  }
}
</script>
