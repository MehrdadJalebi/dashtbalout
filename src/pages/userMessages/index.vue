<route>
{
  "name": "userMessages",
  "meta": {
    "order": 4,
    "isVisible": true,
    "iconName": "mdi-message",
    "roles": ["User"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.messages.title')"
    >
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :options.sync="pages"
      :items="messagesList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.body.substring(0,60) }}
            <span v-if="props.item.body.length > 60">...</span>
          </td>
          <td v-if="props.item.isRead" class="data-min-td success--text"> {{ isRead }} </td>
          <td v-else class="data-min-td error--text"> {{ isntRead }} </td>
          <td class="data-min-td"> {{ props.item.dateAt }} </td>
          <td class="data-min-td">
            <v-btn
              small
              class="px-1"
              color="primary"
              @click="showMessageModal(props.item)"
              >
              <v-icon
                class="ml-1"
                small>
                mdi-message
              </v-icon>
              {{ $t('enums.showMessage') }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('enums.showMessage') }}
        </v-card-title>
      <v-card
        outlined
        class="border-box"
        >
        <v-card
          flat
          class="d-flex">
          <v-layout
            flex-column
            justify-right
            align-center
            class="pa-2"
            >
            <v-row>
              <v-card-text>{{$t('enums.messageTitle') }} : {{ message.title }}</v-card-text>
            </v-row>
        <v-row>
          <v-card-text>{{$t('enums.messageBody') }} : {{ message.body}}</v-card-text>
        </v-row>
          </v-layout>
        </v-card>
      </v-card>
      <div class="text-center mt-3">
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="readMessage(message)"
          >
          {{ $t('pages.userMessages.readedMessageBtn') }}
        </v-btn>
      </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      pages: {},
      totalItems: 0,
      isLoading: false,
      btnLoading: false,
      dialog: false,
      isRead: this.$t('enums.isRead'),
      isntRead: this.$t('enums.isntRead'),
      messagesList: [],
      message: {}
    }
  },
  created () {
    this.getUserMessages()
  },
  computed: {
    headers () {
      return [
        {
          text: this.$t('enums.headers.messageTitle'),
          value: 'title'
        },
        {
          text: this.$t('enums.headers.messageBody'),
          value: 'body'
        },
        {
          text: this.$t('enums.headers.status'),
          value: 'isRead'
        },
        {
          text: this.$t('enums.headers.sendingDate'),
          value: 'dateAt'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getMessages: 'messages/getMessages',
      readed: 'messages/readed',
      showToast: 'snackbar/showToastMessage'
    }),
    getUserMessages () {
      this.isLoading = true
      this.getMessages()
        .then(response => {
          this.messagesList = response.data
          this.isLoading = false
        })
    },
    showMessageModal (val) {
      this.message = val
      this.dialog = true
    },
    readMessage (message) {
      this.btnLoading = true
      this.readed({ id: message.id }).then(response => {
        this.btnLoading = false
        this.getUserMessages()
        this.dialog = false
      })
    }
  }
}
</script>
